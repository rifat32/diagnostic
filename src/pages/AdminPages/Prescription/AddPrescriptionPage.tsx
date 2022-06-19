import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

import AddPatientForm from "../../../components/Forms/PatientForms/AddPatientForm";
import AddDoctorForm from "../../../components/Forms/DoctorForms/AddDoctorForm";
import AddPrescriptionForm from "../../../components/Forms/PrescriptionForms/AddPrescriptionForm";

const AddPrescriptionPage: React.FC = (props:any) => {
	console.log("aa",props?.match.params)
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add Prescription</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Prescription</li>
							<li className="breadcrumb-item active">Add Prescription</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Prescription</h5>
{
	props?.match.params.id? (<AddPrescriptionForm 	value={props?.match.params.id}
				
		type="update" />):(<AddPrescriptionForm value={props?.match.params.appointmentId}   />)
}
									
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddPrescriptionPage;
