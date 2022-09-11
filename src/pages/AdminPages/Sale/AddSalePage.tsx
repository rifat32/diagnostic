import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";


import AddAppoinmentForm from "../../../components/Forms/AppointmentForms/AddAppoinmentForm";
import AddSaleForm from "../../../components/Forms/SaleForms/AddSaleForm";

const AddSalePage: React.FC = (props:any) => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new Sale</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item"> Treatement Plan</li>
							<li className="breadcrumb-item active">Add Treatement Plan</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Treatement Plan</h5>
									{
	props?.match.params.id? (<AddSaleForm 	value={props?.match.params.id}
				
		type="update" />):(<AddSaleForm value={props?.match.params.appointmentId}   />)
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

export default AddSalePage;
