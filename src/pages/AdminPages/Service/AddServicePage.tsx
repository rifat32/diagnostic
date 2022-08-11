import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddProductForm from "../../../components/Forms/ProductForms/AddProductForm";
import AddServiceForm from "../../../components/Forms/ServiceForm/AddServiceForm";

const AddService: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add New Treatment Plan</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Treatment Plan</li>
							<li className="breadcrumb-item active">Add Service</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Treatment Plan</h5>

									<AddServiceForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddService;
