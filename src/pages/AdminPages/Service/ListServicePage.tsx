import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import ListProductsPageComponent from "../../../components/PageComponent/ProductComponent/ListProductsPageComponent";
import { Link } from "react-router-dom";
import ListServicePageComponent from "../../../components/PageComponent/ServiceComponent /ListServicePageComponent";

const ServiceList: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Services</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Treatment Plan</li>
							<li className="breadcrumb-item active">List Service</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-end">
										<h5 className="card-title">All Services</h5>
										<Link
											to="/admin/products/create"
											className="btn btn-primary">
											Add Data
										</Link>
									</div>
									<ListServicePageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ServiceList;
