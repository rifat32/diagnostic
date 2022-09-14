import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddProductForm from "../../Forms/ProductForms/AddProductForm";
import { toast } from "react-toastify";
import AddPatientForm from "../../Forms/PatientForms/AddPatientForm";
import { withRouter } from "react-router-dom";
import AddPatientPaymentForm from "../../Forms/PatientForms/AddPatientPaymentForm";
import AddPatientPrescriptionPaymentForm from "../../Forms/PatientForms/AddPatientPrescriptionPaymentForm";

const ListMainPatientsPageComponent: React.FC = (props:any) => {
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [paymentModalIsOpen, setPaymentModalIsOpen] = React.useState(false);
	const [prescriptionPaymentModalIsOpen, setPrescriptionPaymentModalIsOpen] = React.useState(false);
	
	const showPaymentModal = (show: boolean) => {
		setPaymentModalIsOpen(show);
	};
	const showPrescriptionPaymentModal = (show: boolean) => {
		setPrescriptionPaymentModalIsOpen(show);
	};
	
	const [currentData, setCurrentData] = useState<any>(null);
	const [currentPaymentData, setCurrentPaymentData] = useState<any>(null);
	const [currentPrescriptionPaymentData, setCurrentPrescriptionPaymentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/patients/get/main-patients`);
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
		// setLoading(true)
		apiClient()
			.get(link)
			.then((response: any) => {
				// setLoading(false)
				console.log(response.data.data);
				setData([ ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				// setLoading(false)
				console.log(error.response);
			});
	};

	useEffect(() => {
		loadData(link);
	}, []);

	// pagination required
	const loadData = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response.data.data);
				setData([...data, ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/patients/${id}`)
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
// 	const calculateDue = (item:any) => {

//  let total = parseFloat(item.sub_total) - parseFloat(item.discount) + parseFloat(item.line_discount)
//   let due = (total) - parseFloat(item.paid)
//   if(!due){
// 	due = 0	
//   }
//  return due;
// 	}

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	if(e.target.value) {
		
		apiClient()
			.get(`${BACKENDAPI}/v1.0/patients/get/main-patients?search=${e.target.value}`)
			.then((response: any) => {
			
				console.log(response.data.data);
				setData([ ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				
				console.log(error.response);
			});
	} else {
		
	apiClient()
		.get(link)
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

}
	
	return (
		<>
		<div className="row">
		<div className="col-6 offset-3">

		<input type="text" className="form-control" onChange={handleSearch}/>
		</div>

	</div>
			<table className="table">
				<thead>
					<tr>
					
						<th scope="col">Id</th>
						
						
						<th scope="col">Name</th>
						<th scope="col">Phone</th>
						<th scope="col">Sex</th>
						<th scope="col">Birth Date</th>
						<th scope="col" > <span className="text-danger">Treatment Plan due</span> </th>
						<th scope="col" > <span className="text-danger">Prescription due</span> </th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							el.sub_total = 0;
							el.discount = 0;
							el.line_discount = 0;
							el.paid=0;
							el.sales.map((el2:any) => {
								el.discount += el2.discount
								el2.sale_details.map((el3:any) => {
									el.sub_total += el3.amount
									el.line_discount += el3.line_discount

								})
								el2.payments?.map((el3:any) => {
									el.paid += el3.paid_amount
								})
								
							})
							

							 el.total = parseFloat(el.sub_total) - (parseFloat(el.discount) + parseFloat(el.line_discount))
							 el.due = (el.total) - (el.paid?parseFloat(el.paid):0)
							if(!el.due){
							  el.due = 0	
							}
							el.total_prescription_fees = 0;
							el.total_prescription_paid = 0;
							el.prescriptions.map((el2:any) => {
								el.total_prescription_fees += parseFloat(el2.fees)
								el2.payments.map((el3:any) => {
									el.total_prescription_paid += parseFloat(el3.amount)
								})
							})
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									
									
									<td>{el.name && el.name}</td>
									<td>{el.phone && el.phone}</td>
									<td>{el.sex && el.sex}</td>
									<td>{el.birth_date && el.birth_date}</td>
									<td> <span className="text-danger">{(el.due)}</span> </td>
									<td> <span className="text-danger">{(el.total_prescription_fees - (el.total_prescription_paid?(el.total_prescription_paid):(0)))}</span> </td>
									
						
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
													<a
														onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}
														className="dropdown-item"
														href="#">
														edit
													</a>
												</li>
											<li>
													<a
													  
														className="dropdown-item"
														href="#" onClick={() => {
															setCurrentPaymentData(el);
															showPaymentModal(true);
														}}>
														 Treatment Plan Payment
													</a>
												</li>
												<li>
													<a
													  
														className="dropdown-item"
														href="#" onClick={() => {
															setCurrentPrescriptionPaymentData(el);
															showPrescriptionPaymentModal(true);
														}}>
														 Prescription  Payment
													</a>
												</li>
												
												<li>
													<a
														onClick={() => {
															props.history.push(`/admin/patient/prescription-history/${el.id}`);
														}}
														className="dropdown-item"
														href="#">
														view Prescription history
													</a>
												</li>
												<li>
													<a
														onClick={() => {
															props.history.push(`/admin/patient/treatment-plan-history/${el.id}`);
														}}
														className="dropdown-item"
														href="#">
														view Treatment Plan history
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
					"No data to show"
				)}
			</div>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Update Bank">
				<AddPatientForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
			<CustomModal
				isOpen={paymentModalIsOpen}
				showModal={showPaymentModal}
				type="Add Payment">
				<AddPatientPaymentForm
					value={currentPaymentData}
					updateDataStates={updateDataStates}
					showModal={showPaymentModal}
					type="update"
				/>
			</CustomModal>
			<CustomModal
				isOpen={prescriptionPaymentModalIsOpen}
				showModal={showPrescriptionPaymentModal}
				type="Add Payment">
				<AddPatientPrescriptionPaymentForm
					value={currentPrescriptionPaymentData}
					updateDataStates={updateDataStates}
					showModal={showPrescriptionPaymentModal}
					type="update"
				/>
			</CustomModal>
			
		</>
	);
};

export default withRouter(ListMainPatientsPageComponent);
