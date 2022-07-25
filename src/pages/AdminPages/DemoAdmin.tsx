import React, { useEffect, useState } from "react";
import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";
import { BACKENDAPI } from "../../config";
import { apiClient } from "../../utils/apiClient";

const Admin: React.FC = () => {


	const [data,setData] = useState<any>(null)







	useEffect(()=> {
	apiClient().get(`${BACKENDAPI}/v1.0/get-dashboard-info`)
	.then(response => {
		console.log(response)
		setData(response.data)
	})
	},[])
	  
	  
	return (
		<AdminPageComponent>
					<main id="main" className="main">
				<div className="pagetitle">
					<h1>Dashboard</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Pages</li>
							<li className="breadcrumb-item active">Blank</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
			 <section className="section dashboard">
  <div className="row">
    <div className="col-lg-8">
      <div className="row">
		  {/* today earning  */}
<div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}
            <div className="card-body">
              <h5 className="card-title">Today Income</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-wallet2" />
                </div>
                <div className="ps-3">
                  <h6>{data?.today_income}</h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* end todal earning */}
{/* total earning */}
<div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}
            <div className="card-body">
              <h5 className="card-title">Total Appointment</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar" />
                </div>
                <div className="ps-3">
                  <h6>{data?.total_appointment}</h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* end total earning */}
{/* total payment */}
<div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}
            <div className="card-body">
              <h5 className="card-title">Total Patient</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cash-coin" />
                </div>
                <div className="ps-3">
                  <h6>{data?.total_patient}</h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* end total payment */}
{/* total due */}
<div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}
            <div className="card-body">
              <h5 className="card-title">Total Prescription</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-bank2" />
                </div>
                <div className="ps-3">
                  <h6>{data?.total_prescription}</h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* end total due */}
{/* total totalsell */}
<div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}
            <div className="card-body">
              <h5 className="card-title">Total Patient History</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-check2-circle" />
                </div>
                <div className="ps-3">
                  <h6>{data?.total_patient_history}</h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* end totalsell */}
{/* today sell */}
<div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}
            <div className="card-body">
              <h5 className="card-title">Services Today</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-person-bounding-box" />
                </div>
                <div className="ps-3">
                  <h6>{data?.today_sell}</h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* end today sell */}
        {/* <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Sales <span>| Today</span></h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cart" />
                </div>
                <div className="ps-3">
                  <h6>145</h6>
                  <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card revenue-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Revenue <span>| This Month</span></h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar" />
                </div>
                <div className="ps-3">
                  <h6>$3,264</h6>
                  <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
   
  </div>
</section>

			</main>
		</AdminPageComponent>
	);
};

export default Admin;
