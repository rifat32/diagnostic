import React, { useEffect, useState } from "react";
import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";
import { BACKENDAPI } from "../../config";
import { apiClient } from "../../utils/apiClient";

const Admin: React.FC = () => {


	const [data,setData] = useState<any>(null)

const [selected,setSelected] = useState<any>({
  prescription_due:"today",
  sale_due:"today",
  prescription_income:"today",
  sale_income:"today",
  appointment:"today",
  patient:"today",
  prescription:"today",
  patient_history:"today",
  sale:"today",
  
})





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
		 



  
                {/* Sale Due */}
<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,prescription_due:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,prescription_due:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,prescription_due:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Prescription Due</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-wallet2" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.prescription_due == "today"?(data?.today_prescription_due):(null)}
                    {selected.prescription_due == "total"?(data?.total_prescription_due):(null)}
                    {selected.prescription_due == "this_month"?(data?.this_month_prescription_due):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,sale_due:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,sale_due:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,sale_due:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Treatment Plan Due</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-wallet2" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.sale_due == "today"?(data?.today_sale_due):(null)}
                    {selected.sale_due == "total"?(data?.total_sale_due):(null)}
                    {selected.sale_due == "this_month"?(data?.this_month_sale_due):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* end today sell */}
<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,prescription_income:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,prescription_income:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,prescription_income:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Prescription Income</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.prescription_income == "today"?(data?.today_prescription_income ):(null)}
                    {selected.prescription_income == "total"?(data?.total_prescription_income ):(null)}
                    {selected.prescription_income == "this_month"?(data?.this_month_prescription_income ):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
</div>
<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,sale_income:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,sale_income:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,sale_income:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Treatment Plan Income</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.sale_income == "today"?(data?.today_sale_income ):(null)}
                    {selected.sale_income == "total"?(data?.total_sale_income ):(null)}
                    {selected.sale_income == "this_month"?(data?.this_month_sale_income ):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
</div>
<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,appointment:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,appointment:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,appointment:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Appointment</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cash-coin" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.appointment == "today"?(data?.today_appointment ):(null)}
                    {selected.appointment == "total"?(data?.total_appointment ):(null)}
                    {selected.appointment == "this_month"?(data?.this_month_appointment ):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
</div>
<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,patient:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,patient:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,patient:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Patient</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-person-bounding-box" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.patient == "today"?(data?.today_patient ):(null)}
                    {selected.patient == "total"?(data?.total_patient ):(null)}
                    {selected.patient == "this_month"?(data?.this_month_patient ):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
</div>

<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,prescription:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,prescription:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,prescription:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Prescription</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-person-bounding-box" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.prescription == "today"?(data?.today_prescription ):(null)}
                    {selected.prescription == "total"?(data?.total_prescription ):(null)}
                    {selected.prescription == "this_month"?(data?.this_month_prescription ):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
</div>
<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,patient_history:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,patient_history:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,patient_history:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Patient History</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-person-bounding-box" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.patient_history == "today"?(data?.today_patient_history ):(null)}
                    {selected.patient_history == "total"?(data?.total_patient_history ):(null)}
                    {selected.patient_history == "this_month"?(data?.this_month_patient_history ):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                </div>
              </div>
            </div>
          </div>
</div>
<div className="col-xxl-4 col-md-6 mb-5" >
          <div className="card info-card sales-card" style={{height:"120%"}}>
            <div className="filter">
              <a className="icon" style={{cursor:"pointer"}} data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,sale:"today"})
                }}>Today</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}  onClick={()=>{
                  setSelected({...selected,sale:"this_month"})
                }}>This Month</a></li>
                <li><a className="dropdown-item" style={{cursor:"pointer"}}   onClick={()=>{
                  setSelected({...selected,sale:"total"})
                }}>Total</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Treatment Plan</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-check2-circle" />
                </div>
                <div className="ps-3">
                  <h6>
                    {selected.sale == "today"?(data?.today_sale ):(null)}
                    {selected.sale == "total"?(data?.total_sale):(null)}
                    {selected.sale == "this_month"?(data?.this_month_sale ):(null)}
                    
                    </h6>
                  {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
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
