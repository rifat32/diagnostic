import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddProductForm from "../../Forms/ProductForms/AddProductForm";
import { toast } from "react-toastify";
import AddPatientForm from "../../Forms/PatientForms/AddPatientForm";
import AddDoctorForm from "../../Forms/DoctorForms/AddDoctorForm";
import AddAppoinmentForm from "../../Forms/AppointmentForms/AddAppoinmentForm";
import { Link } from "react-router-dom";
import AddSalePaymentForm from "../../Forms/SaleForms/AddSalePaymentForm";

const ListSalePageComponent: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/sales`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	// const updateDataStates = (updatedData: any) => {
	// 	const tempDatas = data.map((el: any) => {
	// 		if (parseInt(el.id) === parseInt(updatedData.id)) {
	// 			return updatedData;
	// 		}
	// 		return el;
	// 	});
	// 	setData(tempDatas);
	// };
	const updateDataStates = (updatedData: any) => {
		setLoading(true)
		apiClient()
			.get(link)
			.then((response: any) => {
				setLoading(false)
				console.log(response.data.data);
				setData([ ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error.response);
			});
	};

	useEffect(() => {
		loadData(link);
	}, []);

	// pagination required
	const loadData = (link: string) => {
		setLoading(true)
		apiClient()
			.get(link)
			.then((response: any) => {
				setLoading(false)
				console.log(response.data.data);
				setData([...data, ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error.response);
			});
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/sales/${id}`)
				.then((response: any) => {
					console.log(response);
					const tempDatas = data.filter((el: any) => {
						return el.id !== id;
					});
					setData(tempDatas);
					toast.success("data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	};
	

	const calculateSubTotal = ((item:any )=> {
       let total = 0;
	   item.map((el:any) => {
		total +=   parseInt(el.amount)
	   })
		return total
	})
	const calculateDiscount = ((item:any )=> {
		let total = 0;
		item.sale_details.map((el:any) => {
		 total +=   parseInt(el.line_discount)
		})
		total +=   parseInt(item.discount)
		 return total
	 })
	 const calculatePaid = (payments:any[]) => {
		let paid = 0;
		payments.map((el:any) => {
			paid += parseFloat(el.paid_amount)
		})
		return  paid;
	}
	return (
		<>
			<table className="table">
				<thead>
	
					<tr>



						<th scope="col">Doctor</th>
						<th scope="col">Patient</th>
						
						<th scope="col">Status</th>

						<th scope="col">Sub Total</th>
						<th scope="col">Discount</th>
						<th scope="col">total</th>
						<th scope="col">paid</th>
						<th scope="col">due</th>
						<th scope="col">Date</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							 el.calculatedSubTotal = calculateSubTotal(el.sale_details);
                           el.calculatedDiscount = calculateDiscount(el);
						   el.calculatedPaid = calculatePaid(el.payments);
							
							return (
								<tr key={el.id}>
									<td>{el.doctor?.name}</td>
									<td>{el.patient?.name && el.patient?.name}</td>
							
									<td>{el.status && el.status}</td>

									<td>{el.calculatedSubTotal}</td>
									<td>{ el.calculatedDiscount}</td>
									<td>{el.calculatedSubTotal -   el.calculatedDiscount}</td>
									<td>{ el.calculatedPaid}</td>
									<td>{(el.calculatedSubTotal -   el.calculatedDiscount) - el.calculatedPaid}</td>
									<td>{el.sale_date && new Date(el.sale_date).toDateString()}</td>
						
									<td>
										<div className="btn-group">
											<button
												type="button"
												className="btn btn-sm btn-primary dropdown-toggle"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												Action
											</button>
											<ul className="dropdown-menu action">
												{/* <li>
													<a
														onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}
														className="dropdown-item"
														href="#">
														edit
													</a>
												</li> */}
												<li>
													<Link
													   to={`/admin/sales/edit/${el.id}`}
														className="dropdown-item"
														href="#">
														edit
													</Link>
												</li>
											<li>
													<a
													  
														className="dropdown-item"
														href="#" onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}>
														Add Payment
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a
														onClick={() => {
															deleteData(el.id);
														}}
														className="dropdown-item"
														href="#">
														delete
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
											</ul>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			<div className="text-center">
				{nextPageLink ? (
					<button
						className="btn btn-primary"
						onClick={() => {
							loadData(nextPageLink);
						}}>
						Load More ...
					</button>
				) : data.length ? (

					prevPageLink ? (
						"No more data to show"
					) : (
						""
					)

				) : (
                     loading?("Loading.."):("No data to show")
				)}
			</div>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Add Payment">
				<AddSalePaymentForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default ListSalePageComponent;
