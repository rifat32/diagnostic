import React, { useEffect } from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

import AddPatientForm from "../../../components/Forms/PatientForms/AddPatientForm";
import AddDoctorForm from "../../../components/Forms/DoctorForms/AddDoctorForm";
import AddReportTemplateForm from "../../../components/Forms/LaboratoryTestForms/AddReportTemplateForm";
import { ROUTE_LIST } from "../../../RoutConstants";

const AddReportTemplatePage: React.FC = () => {
	function getDomain(url:any, subdomain:any) {
		subdomain = subdomain || false;
	
		url = url.replace(/(https?:\/\/)?(www.)?/i, '');
	
		if (!subdomain) {
			url = url.split('.');
	
			url = url.slice(url.length - 2).join('.');
		}
	
		if (url.indexOf('/') !== -1) {
			return url.split('/')[0];
		}
	
		return url;
	}
	useEffect(() => {
		window.location.href = `${document.location.origin}${ROUTE_LIST.createPrescrption}2`;
	},[])
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add Lab Report Template</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Prescribtion</li>
							<li className="breadcrumb-item active">Add Prescribtion</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Prescribtion</h5>

									<AddReportTemplateForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddReportTemplatePage;
