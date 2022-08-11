import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";


import AddAppoinmentForm from "../../../components/Forms/AppointmentForms/AddAppoinmentForm";
import AddSaleForm from "../../../components/Forms/SaleForms/AddSaleForm";

const AddSalePage: React.FC = () => {
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
							<li className="breadcrumb-item">Sale</li>
							<li className="breadcrumb-item active">Add Sale</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Sale</h5>

									<AddSaleForm />
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
