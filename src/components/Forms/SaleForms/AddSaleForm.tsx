import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import CustomModal from "../../Modal/Modal";
import AddPatientForm from "../PatientForms/AddPatientForm";

interface FormData {
	id:string;
	sale_date: string;
	remarks: string;
	status: string;
	doctor_id: string;
	patient_id: string;
	services: Service[];
	discount: string;
	
	
}
interface Service {
	id: string;
	product_id: string;
	product_name: string;
	line_discount:string;
	price:string;
	
	
  }

const AddSaleForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		id:"",
	sale_date: "",
	remarks:'',
	status: 'Confirmed',
	doctor_id: '',
	patient_id: '',
	services:[],
	discount:'0'
	});
	const [statusList, setStatusList] = useState([
		"Pending Confirmation",
		"Confirmed",
		// "Treated",
		"Cancelled"
]);
	const [doctors, setDoctors] = useState([]);
	const [patients, setPatients] = useState<any>([]);
	const [errors, setErrors] = useState<any>(null);
	useEffect(() => {
		loadDoctors();
		loadPatients();
	}, []);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [toggler,setToggler] = useState<boolean>(false)
	const loadDoctors = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/doctors/all`)
			.then((response: any) => {
				console.log(response);
				setDoctors(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const updateDataStates = (data:any) => {
const tempPatients = [...patients]
tempPatients.push(data)
setPatients(tempPatients);
setFormData({...formData,patient_id:data.id})
	}

	const loadPatients = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/patients/all/list`)
			.then((response: any) => {
				console.log(response);
				setPatients(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	setToggler(!toggler)
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			id:"",
	sale_date: "",
	remarks:'',
	status: 'Confirmed',
	doctor_id: '',
	patient_id: '',
	services:[],
	discount:'0'
		});
		setSearch("")
		setProducts([])
		setToggler(!toggler)
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null);
		if (props.type === "update") {
			updateData();
		} else {
			createData();
		}
	};
	const createData = () => {
		apiClient()
			.post(`${BACKENDAPI}/v1.0/sales`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Data saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// edit data section
	useEffect(() => {
		if (props.type == "update") {
			apiClient().get(`${BACKENDAPI}/v1.0/sales/${props.value}`)
			.then((response:any) => {
	  const{
	
	  id,
	  sale_date,
	  status,
		doctor_id,
		patient_id,
		sale_details,
		discount,
		
	  } = response.data.data
	
	const tempServices = sale_details.map((el:any) => {
	
		return {
			id: el.id,
			product_id:el.product.id,
			product_name:el.product.name,
			price:el.amount,
			line_discount:el.line_discount
		}
	})
	
	
	  setFormData({
		...formData,
		id,
		sale_date,
		status,
		doctor_id,
		patient_id,
		services:tempServices,
		discount
	  
	  
	  })
	  setToggler(!toggler)
			
	})
		}

	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/sales`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("Data Updated");

				props.updateDataStates(response.data.data);
				props.showModal(false);
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
	// end edit Data section
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let index: number = parseInt(e.target.name.split(".")[1]);
		let name: string = e.target.name.split(".")[2];
		console.log(index);
		const tempValues: any = [...formData.services];
		console.log(name);
		tempValues[index][name] = e.target.value;
		setFormData({ ...formData, services: tempValues });
		setToggler(!toggler)
		
	  };

	    // get search string Function
		const [products, setProducts] = useState([]);
		const [search, setSearch] = useState("");
		const searchProduct = (search: string) => {
			apiClient()
			  .get(`${BACKENDAPI}/v1.0/products/search/${search}?type=service`)
			  .then((response: any) => {
				console.log(response);
				const { product } = response.data;
				  setProducts(product)
				 
		
			  
			  })
			  .catch((error) => {
				console.log(error.response);
				// setproduct(null);
				// setFormData({ ...formData, product_id: "" });
				if (error.response.status === 404) {
				  setProducts([])
				  // toast("np product found");
				}
			  });
		  };
  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchProduct(e.target.value);
  };
  const setProductFunc = (product:any) => {
    const tempValues = [...formData.services];
    let foundProduct =   tempValues.find(el => {
         return el.product_name === product.name
       })

if(!foundProduct){
 tempValues.push({
   id: "0",
   product_id: product.id,
   product_name: product.name,
   line_discount:'0',
   price:product.price
 });

 setFormData({ ...formData, services: tempValues });
 setToggler(!toggler)
}
  }
  const removeServiceElement = (index: number) => {
    const tempValues = [...formData.services];

    tempValues.splice(index, 1);

    setFormData({ ...formData, services: tempValues });
  };




  const [subTotalAndDiscount,setSubTotalAndDiscount] = useState<any>({
	discount:0,
	subTotal:0

  })
// 
  const calculateSubTotalAndDiscount = () => {
	let subTotal = 0;
	let discount = 0;
	formData.services.map(el => {
		discount += parseInt(el.line_discount)
		subTotal += parseInt(el.price)
		console.log("d",el.line_discount,"p",el.price)
	})
	discount += parseInt(formData.discount)
	
	setSubTotalAndDiscount({discount,subTotal})

  }
  useEffect(() => {
	calculateSubTotalAndDiscount()
  },[toggler])
 
  
	return (
		<>
		<form className="row g-3" onSubmit={handleSubmit}>
		<div className="col-md-4">
		<label htmlFor="bill" className="form-label">
			Doctor
		</label>
		<select
			className={
				errors
					? errors.wing_id
						? `form-control is-invalid`
						: `form-control is-valid`
					: "form-control"
			}
			id="doctor_id"
			name="doctor_id"
			onChange={handleSelect}
			value={formData.doctor_id}>
			<option value="">Please Select</option>
			{doctors.map((el: any, index) => (
				<option
					key={index}
					value={el.id}
					style={{ textTransform: "uppercase" }}>
					{el.name}
				</option>
			))}
		</select>

		{errors?.doctor_id && (
			<div className="invalid-feedback">{errors.doctor_id[0]}</div>
		)}
		{errors && <div className="valid-feedback">Looks good!</div>}
	</div>
		<div className="col-md-4">
		<label htmlFor="bill" className="form-label">
			Patient
		</label>
		<select
			className={
				errors
					? errors.patient_id
						? `form-control is-invalid`
						: `form-control is-valid`
					: "form-control"
			}
			id="patient_id"
			name="patient_id"
			onChange={handleSelect}
			value={formData.patient_id}>
			<option value="">Please Select</option>
			{patients.map((el: any, index:number) => (
				<option
					key={index}
					value={el.id}
					style={{ textTransform: "uppercase" }}>
					{el.name}
				</option>
			))}
		</select>

		{errors?.patient_id && (
			<div className="invalid-feedback">{errors.patient_id[0]}</div>
		)}
		{errors && <div className="valid-feedback">Looks good!</div>}
	</div>
	<div className="col-md-2 mt-5">
		<button 
		type="button"
		 className="btn btn-primary"
		 onClick={() => {
		
			showModal(true);
		}}
		
		>
			+
		</button>
	</div>
		<div className="col-md-4">
				<label htmlFor="sale_date" className="form-label">
					 Date
				</label>
				<input
					type="date"
					className={
						errors
							? errors.sale_date
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="sale_date"
					name="sale_date"
					onChange={handleChange}
					value={formData.sale_date}
				/>

				{errors?.sale_date && (
					<div className="invalid-feedback">{errors.sale_date[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="discount" className="form-label">
				Discount
				</label>
				<input
					type="text"
					className={
						errors
							? errors.discount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="discount"
					name="discount"
					onChange={handleChange}
					value={formData.discount}
				/>
				{errors?.discount && (
					<div className="invalid-feedback">{errors.discount[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
			<label htmlFor="status" className="form-label">
				 Status
			</label>
			<select
				className={
					errors
						? errors.blood_group
							? `form-control is-invalid`
							: `form-control is-valid`
						: "form-control"
				}
				id="status"
				name="status"
				onChange={handleSelect}
				value={formData.status}>
				<option value="">Please Select</option>
				{statusList.map((el: any, index) => (
					<option
						key={index}
						value={el}
						style={{ textTransform: "uppercase" }}>
						{el}
					</option>
				))}
			</select>

			{errors?.status && (
				<div className="invalid-feedback">{errors.status[0]}</div>
			)}
			{errors && <div className="valid-feedback">Looks good!</div>}
		</div>
		<div className="col-12">
        <div className="row">
        <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bi bi-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="search"
                  onChange={searchFunc}
                  value={search}
       
                  placeholder="search product by name"
                />
             
         </div>
         <div style={{marginTop:"-0.7rem",marginBottom:"0.8rem"}} >
          {products.map((el:any) => {
return   <h5 style={{cursor:"pointer"}} className="border-bottom"  onClick={() => setProductFunc(el)}>{el.name}</h5>
          })}
        
         </div>
        </div>
     
         
        
          <div className="row bg-primary">
            <div className="col-md-2 text-center">
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Name</p>
            </div>
			<div className="col-md-4 text-center">
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Price</p>
            </div>
            <div className="col-md-4 text-center">
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Discount</p>
            </div>
            <div className="col-md-2 text-center">
			<p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Action</p>
            </div>
          </div>
          <div >
            {formData.services.map((el, index) => {
              return (
                <>
                  <br />
                  <div className="row">
                    <div className="col-md-2">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`services.${index}.product_name`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`services.${index}.product_name`}
                        name={`services.${index}.product_name`}
                        onChange={handleServiceChange}
                        value={formData.services[index].product_name}
                        readOnly
                      />
                      {errors && (
                        <>
                          {errors[`services.${index}.product_name`] ? (
                            <div className="invalid-feedback">
                              This field is required
                            </div>
                          ) : (
                            <div className="valid-feedback">Looks good!</div>
                          )}
                        </>
                      )}
                    </div>
					<div className="col-md-4">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`services.${index}.price`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`services.${index}.price`}
                        name={`services.${index}.price`}
                        onChange={handleServiceChange}
                        value={formData.services[index].price}
                        readOnly
                      />
                      {errors && (
                        <>
                          {errors[`services.${index}.price`] ? (
                            <div className="invalid-feedback">
                              This field is required
                            </div>
                          ) : (
                            <div className="valid-feedback">Looks good!</div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`services.${index}.line_discount`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`services.${index}.line_discount`}
                        name={`services.${index}.line_discount`}
                        onChange={handleServiceChange}
                        value={formData.services[index].line_discount}
                        
                      />
                      {errors && (
                        <>
                          {errors[`services.${index}.line_discount`] ? (
                            <div className="invalid-feedback">
                              This field is required
                            </div>
                          ) : (
                            <div className="valid-feedback">Looks good!</div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeServiceElement(index)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
		<div className="row mt-5 ">
			<div className="col-md-4 border">
			    <p>sub total:{subTotalAndDiscount.subTotal}</p>
				<p>discount: {subTotalAndDiscount.discount}</p>
				
				<p>total:{subTotalAndDiscount.subTotal - subTotalAndDiscount.discount}</p>
			</div>
		</div>

			<div className="text-center">
				<button type="submit" className="btn btn-primary me-2">
					Submit
				</button>
				<button
					type="button"
					onClick={resetFunction}
					className="btn btn-secondary">
					Reset
				</button>
			</div>
		</form>
			
		<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Create Patient">
				<AddPatientForm
				updateDataStates={updateDataStates}
					showModal={showModal}
					type="add"
				/>
			</CustomModal>
		</>
	);
};

export default AddSaleForm;
