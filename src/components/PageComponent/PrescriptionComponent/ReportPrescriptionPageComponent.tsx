import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddProductForm from "../../Forms/ProductForms/AddProductForm";
import { toast } from "react-toastify";
import AddPatientForm from "../../Forms/PatientForms/AddPatientForm";
import AddDoctorForm from "../../Forms/DoctorForms/AddDoctorForm";
import AddPrescriptionForm from "../../Forms/PrescriptionForms/AddPrescriptionForm";
import { Link } from "react-router-dom";
import AddPaymentForm from "../../Forms/ExpenseForms/AddPaymentForm";
import AddPrescriptionPaymentForm from "../../Forms/PrescriptionForms/AddPaymentForm";

const ReportPrescriptionPageComponent: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/prescriptions`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

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
				.delete(`${BACKENDAPI}/v1.0/doctors/${id}`)
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
	const calculatePaid = (payments:any[]) => {
		let paid = 0;
		payments.map((el:any) => {
			paid += parseFloat(el.amount)
		})
		return  paid;
	}


	const[dateSearch,setDateSearch] = useState<any>({
		from:"",
		to:""
	})
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDateSearch({
			...dateSearch,
			[e.target.name]:e.target.value
		})
	
	}
	const handleDateSearch = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/prescriptions/date/${dateSearch.from}/${dateSearch.to}`)
			.then((response: any) => {
				console.log(response.data.data);
				setData([ ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {

				console.log(error.response);
			});
        }
	return (
		<>

<div className="row mt-2">
		<div className="col-6 offset-3">
			<div className="row">
				<div className="col-4">
				<input type="date" className="form-control" name="from" value={dateSearch.from} onChange={handleDateChange}/>
				</div>
				<div className="col-1">
				--
				</div>
				<div className="col-4">
				<input type="date" className="form-control" name="to" value={dateSearch.to} onChange={handleDateChange}/>
				</div>
				<div className="col-2">
				<button type="button" onClick={handleDateSearch} className="btn btn-primary"> filter</button>
				</div>
			</div>
		</div>
	</div>




			<table className="table">
				<thead>
					<tr>
					
						<th scope="col">Id</th>
						<th scope="col">Patient</th>
						<th scope="col">Next Appointment</th>
						<th scope="col">Fees</th>
						<th scope="col">Total Paid</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{el.patient.name}</td>
									<td>{new Date(el.next_appointment).toLocaleDateString()}</td>
									<td>{el.fees}</td>
									<td>{calculatePaid(el.payments)}</td>
						
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
												<li>
													<Link
													   to={`/admin/prescriptions/edit/${el.id}`}
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
				<AddPrescriptionPaymentForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default ReportPrescriptionPageComponent;
