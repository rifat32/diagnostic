import React, { useEffect, useState } from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import ListProductsPageComponent from "../../../components/PageComponent/ProductComponent/ListProductsPageComponent";
import { Link } from "react-router-dom";

import ListPatientsPageComponent from "../../../components/PageComponent/PatientComponent/ListPatientPageComponent";
import { ROUTE_LIST } from "../../../RoutConstants";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { printInvoice } from "../../../utils/PrintInvoice";
import CustomModal from "../../../components/Modal/Modal";
import AddPrescriptionPaymentForm from "../../../components/Forms/PrescriptionForms/AddPaymentForm";
import { toast } from "react-toastify";
import AddSalePaymentForm from "../../../components/Forms/SaleForms/AddSalePaymentForm";

const ViewPatientTreatmentPlanHistoryPage: React.FC = (props:any) => {
	const [patient, setPatient] = useState<any>(null);
	const [medicalHistory,setMedicalHistory] = useState<any>(null);
	const [pId,setPid] = useState<any>(null);
	useEffect(() => {
	  apiClient()
		.get(`${BACKENDAPI}/v1.0/patients/${props.match.params.patientId}`)
		.then((response: any) => {
		  console.log(response);
		  setPatient(response.data.data);
		  let medicalHistoryFound = false ;
		  let tempPrescription = JSON.parse(JSON.stringify(response.data.data.prescriptions))
		  for(let i = 0; i<tempPrescription.length; i++) {
			if(!medicalHistoryFound) {
				console.log(medicalHistory,tempPrescription[i].id)
				if(tempPrescription[i].medical_history) {
					medicalHistoryFound = true
					setMedicalHistory(JSON.parse(tempPrescription[i].medical_history))
					setPid(tempPrescription[i].id)
				}
				
			}
		  }
		  response.data.data.prescriptions.map((el:any) => {
			
              
		  })
  
		})
		.catch((error) => {
		  console.log(error);
		});
	}, []);
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/sales/patient/${props.match.params.patientId}`);
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
		<AdminPageComponent>
			 <main id="main" className="main">
        {/* End Page Title */}
        <section className="section">
          {patient && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {/* <ListOrderPageComponent /> */}
                    <div className="">
                    
 Treatment Plan History
                     
                      <div className="row mt-2">
                        <div className="col-12 me-2">
                          <div className="row">
                          {/* <div className="col-12 shadow-sm border p-2 mt-3">
						  <h3 className="text-center">prescriptions {pId}</h3>
						  {patient.prescriptions.map((el:any) => {
return (<div className="row">
	
	<h4 className="text-center">  O/E: </h4>
     
	 <div className="row">
	 {
							el.cc.map((el2:any) => {
             return  <p className="col-4">{el2.name}:{el2.value}</p>
							})
						  }
						  
	 </div>
	 
	 <h4 className="text-center"> Medicines: </h4>
	 <div className="row">
	 {
							el.medicines.map((el2:any) => {
             return  <div className="row">
				<div className="col-4 text-center">
					{
						el2.product_name
					}
				</div>
				<div className="col-4 text-center">
					<span className="me-2">
					{
						el2.morning
					}
					</span>
					<span className="me-2">
					+
					</span>
					<span className="me-2">
					{
						el2.afternoon
					}
					</span>
					<span className="me-2">
					+
					</span>
					
					<span className="me-2">
					{
						el2.night
					}
					</span>
					
				</div>
				<div className="col-4 text-center">
					{
						el2.end_time
					}
				</div>
				
				
				</div>
							})
						  }
						  
	 </div>

	 <h4 className="text-center">  Investigation: </h4>
     
	 <div className="row">
	 {
							el.tests.map((el2:any) => {
             return  <p className="col-4">{el2.name}</p>
							})
						  }
						  
	 </div>
	 <h4 className="text-center"> Past Meducal History: </h4>
	 <p>{el.past_medical_history}</p>
	 <h4 className="text-center"> Patient   History: </h4>
	 <p>{el.patient_history}</p>
	 <h4 className="text-center"> Fee: </h4>
	 <p>{el.fees}</p>

		<hr />				  
</div>)
						  })}
							
						 


                          </div> */}
    

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






















                      
                          </div>
                        </div>

                        {/* <div className="col-4 ms-2">
                          <div className="row">
                          
                          <div className="col-12 shadow-sm border p-2 mt-3">
                              <h6 style={{ fontWeight: "bold" }}>Patient</h6>
                              <p className="p-0 m-0">
                              name:  {patient.name}
								
                              </p>
							  <p className="p-0 m-0">
                              sex:  {patient.sex}
								
                              </p>
							  <p className="p-0 m-0">
                              birth date:  {patient.birth_date}
								
                              </p>
							  
                              <hr />
                              <h6 style={{ fontWeight: "bold" }}>
                                Contact Information
                              </h6>
                              {patient.email ? (
                                <p className="p-0 m-0">email: {patient.email}</p>
                              ) : (
                                "no email"
                              )}
                              {patient.phone ? (
                                <p className="p-0 m-0">phone: {patient.phone}</p>
                              ) : (
                                "no phone"
                              )}
							   {patient.address ? (
                                <p className="p-0 m-0">address: {patient.address}</p>
                              ) : (
                                "no address"
                              )}
							  
                            
                              <hr />
                            
                             
                            </div>
							{medicalHistory && 	<div className="col-12 shadow-sm border p-2 mt-3">

<h6 style={{ fontWeight: "bold" }}>last Medical History</h6>
<p className="p-0 m-0">
(1) Are you undergoing any medical treatment at present? <br /> 
Ans:{
medicalHistory.undergoing_treatment?"yes":"no"
}
 
  
</p>
<p className="p-0 m-0">
(2) Do you have, or have you had any of the following? <br /> 
Ans:	<div className="row">
				{
					medicalHistory.diseases.map((el:any) =>  (
				
							<div className="col-6">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`disease__${el.id}`}
						   name="disease[]"
						   value={`disease_${el.id}`}
						  
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`disease_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
 
  
</p>
<p className="p-0 m-0">
				(3) Have You suffered allergy or other reactions (Rash, Itchiness etc) to:
			<div className="row">
				{
					medicalHistory.allergies.map((el:any) =>  (
				
							<div className="col-12">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`allergy_${el.id}`}
						   name="allergy[]"
						   value={`allergy_${el.id}`}
					
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`disease_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
			
			</p>
			<p className="p-0 m-0">
			(4) Have you ever had any adverse effects from local anaesthetics?<br /> 
Ans:{
medicalHistory.local_anaesthetics?"yes":"no"
}
			
			
			</p>
			<p className="p-0 m-0">
			(5) Have you ever experienced unusually prononged bleeding after injury or tooth extraction?<br /> 
Ans:{
medicalHistory.prolonged_bleeding?"yes":"no"
}
			
			
			</p>
			<p className="p-0 m-0">
			(6) Have you ever experienced unusually prononged bleeding after injury or tooth extraction?<br /> 
Ans:{
medicalHistory.penicillin_given?"yes":"no"
}
			
			
			</p>
			<p className="p-0 m-0">
			(7) Are you taking any medicines,tablets, injections (etc.) at present?<br /> 
Ans:{
medicalHistory.taking_medicines?"yes":"no"
}
			
			
			</p>
			<p className="p-0 m-0">
			If yes can you please indicate the nature of this medication?<br /> 
Ans:{
medicalHistory.nature_of_medication
}
			
			
			</p>
			<p className="p-0 m-0">
				(8) Have you been treated with any of the following in the past 5 year:?
			<div className="row">
				{
					medicalHistory.treated.map((el:any) =>  (
				
							<div className="col-6">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`treated__${el.id}`}
						   name="treated[]"
						   value={`treated_${el.id}`}
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`disease_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
			
			</p>
			<p className="p-0 m-0">
			(9) Have you ever recieved radioTherapy?<br /> 
Ans:{
medicalHistory.recieved_radiotherapy?"yes":"no"
}
			
			
			</p>
			<p className="p-0 m-0">
			(10) Do you smoke?<br /> 
Ans:{
medicalHistory.smoke?"yes":"no"
}
			
			
			</p>
			<p className="p-0 m-0">
			If yes how much on average per day?<br /> 
Ans:{
medicalHistory.smoke_times
}
			
			
			</p>
			<p className="p-0 m-0">
				(11) For female Patient?
			<div className="row">
				{
					medicalHistory.female.map((el:any) =>  (
				
							<div className="col-6">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`female_${el.id}`}
						   name="female[]"
						   value={`female_${el.id}`}
						 
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`female_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
			
			</p>
			<p className="p-0 m-0">
			(12) Please add any other information or comments on your medical history below<br /> 
Ans:{
medicalHistory.other_information
}
			
			
			</p>

<hr />



</div>}
						
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>
      </main>
		</AdminPageComponent>
	);
};

export default ViewPatientTreatmentPlanHistoryPage;
