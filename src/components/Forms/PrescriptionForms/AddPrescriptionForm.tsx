import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";
import CustomModal from "../../Modal/Modal";
import AddMedicalHistoryForm from "./AddMedicalHistoryForm";
import { ROUTE_LIST } from "../../../RoutConstants";
import { printInvoice } from "../../../utils/PrintInvoice";
import CustomModal2 from "../../Modal/Modal2";

interface FormData {
  id:string;
  description: string;
  prescription: Prescription[];
  tests: Test[];
  cc: CC[];
  note: string;
  patient_history: string;
  next_appointment:string;
  fees:string;
  medical_history:string;
}
interface Prescription {
  id: string;
  product_id: string;
  product_name: string;
  times:{
    morning:boolean
    afternoon:boolean
    night:boolean
  }
  end_time:string
}
interface Test {
  name: string;
}
interface CC {
  name: string;
  value: string;
}
const AddPrescriptionForm: React.FC<UpdateFormInterface> = (props) => {
  const [formData, setFormData] = useState<FormData>({
    id:"",
    description: "",
    prescription: [],
    note: "",
    patient_history:"",
  
    tests: [{ name: "" }],
    next_appointment:'',
    cc:[
      {
name:"BP",
value:""
    },
    {
      name:"Pulse",
      value:""
    },
    {
            name:"Heart",
            value:""
     },
  ],
  fees:'',
  medical_history:''
  });

  const [errors, setErrors] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>();
  
  const loadAppointment = () => {
    // appointmentId
    apiClient()
      .get(`${BACKENDAPI}/v1.0/appointments/${props.value}`)
      .then((response: any) => {
        console.log("appointment",response);
        setAppointment(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    loadAppointment();
  }, []);

  const [currentPatient, setCurrentPatient] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // if (e.target.name == "patient_id") {
    //   patients.map((el: any) => {
    //     if (parseInt(el.id) === parseInt(e.target.value)) {
    //       setCurrentPatient(el);
    //     }
    //   });
    // }
  };
  const resetFunction = () => {
    setFormData({
      id:"",
      description: "",
      prescription: [],
      note: "",
      patient_history:"",
      tests: [{ name: "" }],
      cc:[ {
        name:"BP",
        value:""
            },
            {
              name:"Pulse",
              value:""
            },
            {
                    name:"Heart",
                    value:""
             },],
            next_appointment:'',
            fees:'',
            medical_history:""

    });
  };
  const [search, setSearch] = useState("");
  // get search string Function
  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  // search on enter
  const searchOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      searchProduct(search);
    }
  };
  // search on focus change
  const searchOnBlur = () => {
    searchProduct(search);
  };
  // product search logic
  const searchProduct = (search: string) => {
    apiClient()
      .get(`${BACKENDAPI}/v1.0/products/search/${search}`)
      .then((response: any) => {
        console.log(response);
        const { product } = response.data;
        // setproduct(product);
        // setFormData({ ...formData, product_id: product.id });
        const tempValues = [...formData.prescription];
     let foundProduct =   tempValues.find(el => {
          return el.product_name === product.name
        })

if(!foundProduct){
  tempValues.push({
    id: "0",
    product_id: product.id,
    product_name: product.name,
    times:{
      morning:false,
      afternoon:false,
      night:false,
    },
    end_time:''
  });

  setFormData({ ...formData, prescription: tempValues });
}
      
      })
      .catch((error) => {
        console.log(error.response);
        // setproduct(null);
        // setFormData({ ...formData, product_id: "" });
        if (error.response.status === 404) {
          toast("np product found");
        }
      });
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
      .post(`${BACKENDAPI}/v1.0/prescriptions`, { ...formData, patient_id:appointment.patient.id,appointment_id:appointment.id })
      .then((response:any) => {
        console.log(response);
        toast.success("Data saved");
        printInvoice(response.data.invoice);
        // resetFunction();

        // window.location.href = `${document.location.origin}${ROUTE_LIST.listAppointment}`;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 422) {
          toast.error("invalid input");
          setErrors(error.response.data.errors);
        }
        ErrorMessage(error.response.status, error.response.data.message);
      });
  };
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // edit data section
  useEffect(() => {
    if (props.type == "update") {
      // setFormData(props.value);
      apiClient().get(`${BACKENDAPI}/v1.0/prescriptions/${props.value}`)
      .then((response:any) => {
const{
  description,
id,
  fees,
  patient,
  medicines,
  tests,
  cc,
  payments,
  note,
  patient_history,
  next_appointment,
  medical_history
} = response.data.data



setFormData({
  ...formData,
  id,
  description,
  note,
  next_appointment,
  fees,

  prescription: medicines,
  tests,
  cc,
  patient_history,
  medical_history





})
      })
    }
  }, []);
  const updateData = () => {
    apiClient()
      .put(`${BACKENDAPI}/v1.0/prescriptions`, {
        
        ...formData, patient_id:appointment.patient.id,appointment_id:appointment.id 
      
      }
      )
      .then((response: any) => {
        console.log(response);
        toast.success("Data Updated");
        props.updateDataStates(response.data.data);
        props.showModal(false);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        if (error.response.status === 404 || error.response.status === 400) {
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
  const handlePrescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index: number = parseInt(e.target.name.split(".")[1]);
    let name: string = e.target.name.split(".")[2];
    console.log(index);
    const tempValues: any = [...formData.prescription];
    console.log(name);
    tempValues[index][name] = e.target.value;
    setFormData({ ...formData, prescription: tempValues });
  };
  const handlePrescriptionCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index: number = parseInt(e.target.name.split(".")[1]);
    let name: string = e.target.name.split(".")[3];
    console.log(index);
    const tempValues: any = [...formData.prescription];
    console.log(name);
  
    tempValues[index]['times'][name] = e.target.checked;
    setFormData({ ...formData, prescription: tempValues });
  };
  
  const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index: number = parseInt(e.target.name.split(".")[1]);
    let name: string = e.target.name.split(".")[2];
    console.log(index);
    const tempValues: any = [...formData.tests];
    console.log(name);
    tempValues[index][name] = e.target.value;
    setFormData({ ...formData, tests: tempValues });
  };
  const handleCCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index: number = parseInt(e.target.name.split(".")[1]);
    let name: string = e.target.name.split(".")[2];
    console.log(index);
    const tempValues: any = [...formData.cc];
    console.log(name);
    tempValues[index][name] = e.target.value;
   
    setFormData({ ...formData, cc: tempValues });
  };
  const removePresctiptionElement = (index: number) => {
    const tempValues = [...formData.prescription];

    tempValues.splice(index, 1);

    setFormData({ ...formData, prescription: tempValues });
  };
  const removeTestsElement = (index: number) => {
    const tempValues = [...formData.tests];

    tempValues.splice(index, 1);

    setFormData({ ...formData, tests: tempValues });
  };

  const AddTest = () => {
    const tempValues = [...formData.tests];
    tempValues.push({
      name: "",
    });

    setFormData({ ...formData, tests: tempValues });
  };
  const deleteTest = () => {
    const tempValues = [...formData.tests];

    if (tempValues.length > 1) {
      tempValues.pop();
    }
    setFormData({ ...formData, tests: tempValues });
  };
  const removeCCElement = (index: number) => {
    const tempValues = [...formData.cc];

    tempValues.splice(index, 1);

    setFormData({ ...formData, cc: tempValues });
  };

  const AddCC = () => {
    const tempValues = [...formData.cc];
    tempValues.push({
      name: "",
      value:''
    });

    setFormData({ ...formData, cc: tempValues });
  };
  const deleteCC = () => {
    const tempValues = [...formData.cc];

    if (tempValues.length > 1) {
      tempValues.pop();
    }
    setFormData({ ...formData, cc: tempValues });
  };

  function getAge(dateString:string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


const [modalIsOpen, setIsOpen] = React.useState(false);
const showModal = (show: boolean) => {
  setIsOpen(show);
};


const updateDataStates = (updatedData: any) => {
  setFormData({
    ...formData,
    medical_history:JSON.stringify(updatedData)
  })
};
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-3">
          Patient
      
          <input   type="hidden"
                        className="form-control"
                        id={`patient_id`}
                        name={`patient_id`}
                        value={appointment?.patient?.name}/>
       

          {errors?.patient_id && (
            <div className="invalid-feedback">{errors.patient_id[0]}</div>
          )}
          {errors && <div className="valid-feedback">Looks good!</div>}
        </div>
		<div className="col-md-9">
	
          <div className="row ">
            <div className="col-12 ">
              <table className="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                   
                    <th scope="col">Sex</th>
                    <th scope="col">Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {appointment?.patient?.name}</td>
                    <td>{appointment?.patient?.sex}</td>
                    <td>{getAge(appointment?.patient?.birth_date)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
       
		</div>
        {/* <br />
        {currentPatient ? (
          <div className="row mb-5 mt-5">
            <div className="col-8 offset-2">
              <table className="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {currentPatient.name}</td>
                    <td>{currentPatient.phone && currentPatient.phone}</td>
                    <td>{currentPatient.address && currentPatient.address}</td>
                    <td>{currentPatient.age && currentPatient.age}</td>
                    <td>{currentPatient.sex && currentPatient.sex}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null} */}
      </div>

      <div className="row">
        <div className="col-md-4">
          {/* cc */}
          <div className="row ">
        <div className="col-12">
         
            <h3 className="ms-2">O/E</h3>
        
          <div className="row bg-primary">
            <div className="col-md-5">
  
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Name</p>
            </div>
            <div className="col-md-5">
  
  <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Value</p>
</div>
            <div className="col-md-2">
           
             
            </div>
          </div>
          <div className="row mb-2">
            {formData.cc.map((el, index) => {
              return (
                <div className="col-12">
                  <br />
                  <div className="row">
                    <div className="col-md-5">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`cc.${index}.name`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`cc.${index}.name`}
                        name={`cc.${index}.name`}
                        onChange={handleCCChange}
                        value={formData.cc[index].name}
                      />
                      {errors && (
                        <>
                          {errors[`cc.${index}.name`] ? (
                            <div className="invalid-feedback">
                              This field is required
                            </div>
                          ) : (
                            <div className="valid-feedback">Looks good!</div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`cc.${index}.value`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`cc.${index}.value`}
                        name={`cc.${index}.value`}
                        onChange={handleCCChange}
                        value={formData.cc[index].value}
                      />
                      {errors && (
                        <>
                          {errors[`cc.${index}.value`] ? (
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
                        onClick={() => removeCCElement(index)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

         
          </div>
          <div className="text-center">
              <button
                className="btn btn-danger me-2"
                type="button"
                onClick={deleteCC}
              >
                -
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={AddCC}
              >
                +
              </button>
            </div>
        </div>
      </div>






        </div>
        <div className="col-md-7 offset-1">
          <div className="row">
            <div className="col-md-12">
            <h3 className="text-center">Medicines</h3>
            </div>
			<div className="col-12">
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
                  onKeyDown={searchOnKeyDown}
                  onBlur={searchOnBlur}
                  placeholder="search product by name"
                />
              </div>
         
        
          <div className="row bg-primary">
            <div className="col-md-2 text-center">
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Name</p>
            </div>
            <div className="col-md-4 text-center">
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Times</p>
            </div>
            <div className="col-md-4 text-center">
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >End Time</p>
            </div>
            <div className="col-md-2 text-center">
			<p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Action</p>
            </div>
          </div>
          <div >
            {formData.prescription.map((el, index) => {
              return (
                <>
                  <br />
                  <div className="row">
                    <div className="col-md-2">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`prescription.${index}.product_name`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`prescription.${index}.product_name`}
                        name={`prescription.${index}.product_name`}
                        onChange={handlePrescriptionChange}
                        value={formData.prescription[index].product_name}
                        readOnly
                      />
                      {errors && (
                        <>
                          {errors[`prescription.${index}.product_name`] ? (
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
                      <div className="row">
                        <div className="col-4">  <input
                        type="checkbox"
                     
                        id={`prescription.${index}.times.morning`}
                        name={`prescription.${index}.times.morning`}
                        onChange={handlePrescriptionCheckedChange}
                     
                        checked={formData.prescription[index].times.morning}
                        
                      /></div>
                        <div className="col-4">   <input
                        type="checkbox"
                     
                        id={`prescription.${index}.times.afternoon`}
                        name={`prescription.${index}.times.afternoon`}
                        onChange={handlePrescriptionCheckedChange}
                        checked={formData.prescription[index].times.afternoon}
                     
                        
                      /></div>
                        <div className="col-4">
                        <input
                        type="checkbox"
                     
                        id={`prescription.${index}.times.night`}
                        name={`prescription.${index}.times.night`}
                        onChange={handlePrescriptionCheckedChange}
                        checked={formData.prescription[index].times.night}
                     
                        
                      /></div>
                      </div>
                    
                    
                    
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`prescription.${index}.end_time`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`prescription.${index}.end_time`}
                        name={`prescription.${index}.end_time`}
                        onChange={handlePrescriptionChange}
                        value={formData.prescription[index].end_time}
                        
                      />
                      {errors && (
                        <>
                          {errors[`prescription.${index}.end_time`] ? (
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
                        onClick={() => removePresctiptionElement(index)}
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



          </div>
        </div>
      </div>

      <br />
      <div className="row mt-5">
        
        <div className="col-md-5">

        </div>
        <div className="col-md-7">
        <div className="row ">
        <div className="col-12">
         
            <h3 className="text-center">Investigation</h3>
        
          <div className="row bg-primary">
            <div className="col-md-10">
  
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Name</p>
            </div>
            
            <div className="col-md-2 text-center">
            
             
            </div>
          </div>
          <div>
            {formData.tests.map((el, index) => {
              return (
                <>
                  <br />
                  <div className="row">
                    <div className="col-md-10 text-center">
                      <input
                        type="text"
                        className={
                          errors
                            ? errors[`tests.${index}.name`]
                              ? `form-control is-invalid`
                              : `form-control is-valid`
                            : "form-control"
                        }
                        id={`tests.${index}.name`}
                        name={`tests.${index}.name`}
                        onChange={handleTestChange}
                        value={formData.tests[index].name}
                      />
                      {errors && (
                        <>
                          {errors[`tests.${index}.name`] ? (
                            <div className="invalid-feedback">
                              This field is required
                            </div>
                          ) : (
                            <div className="valid-feedback">Looks good!</div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="col-md-2 text-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeTestsElement(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="text-center mt-2">
              <button
                className="btn btn-danger me-2"
                type="button"
                onClick={deleteTest}
              >
                -
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={AddTest}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>

 

   

      <div className="col-md-12">
        <label htmlFor="note" className="form-label">
          History
        </label>
        <textarea
          className={
            errors
              ? errors.note
                ? `form-control is-invalid`
                : `form-control is-valid`
              : "form-control"
          }
          id="note"
          name="note"
          onChange={handleTextareaChange}
          value={formData.note}
          rows={4}
        ></textarea>

        {errors?.name && (
          <div className="invalid-feedback">{errors.name[0]}</div>
        )}
        {errors && <div className="valid-feedback">Looks good!</div>}
      </div>
      <div className="col-md-12">
        <label htmlFor="patient_history" className="form-label">
        Patient  History
        </label>
        <textarea
          className={
            errors
              ? errors.patient_history
                ? `form-control is-invalid`
                : `form-control is-valid`
              : "form-control"
          }
          id="patient_history"
          name="patient_history"
          onChange={handleTextareaChange}
          value={formData.patient_history}
          rows={4}
        ></textarea>

        {errors?.name && (
          <div className="invalid-feedback">{errors.name[0]}</div>
        )}
        {errors && <div className="valid-feedback">Looks good!</div>}
      </div>

      <div className="row">
        <div className="col-6">
          <button type="button" 
          
          onClick={() => {
           
            showModal(true);
          }}
          
         className="btn btn-primary" 
          >PMW</button>
        </div>
      </div>
      
      <div className="row mt-2">
        <div className="col-6"></div>
        <div className="col-6">
          <div className="row">
          <div className="col-6 ">
          
          <label htmlFor="fees" className="form-label">
          Fees
          </label>
          <input
            type="text"
            className={
              errors
                ? errors.fees
                  ? `form-control is-invalid`
                  : `form-control is-valid`
                : "form-control"
            }
            id="fees"
            name="fees"
            onChange={handleChange}
            value={formData.fees}
          />
          {errors?.fees && (
            <div className="invalid-feedback">{errors.fees[0]}</div>
          )}
          {errors && <div className="valid-feedback">Looks good!</div>}
        
              </div>
            <div className="col-6 ">
          
				<label htmlFor="next_appointment" className="form-label">
					Next Appointment Date
				</label>
				<input
					type="date"
					className={
						errors
							? errors.next_appointment
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="next_appointment"
					name="next_appointment"
					onChange={handleChange}
					value={formData.next_appointment}
				/>
				{errors?.next_appointment && (
					<div className="invalid-feedback">{errors.next_appointment[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			
            </div>
          </div>
         
        </div>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary me-2">
          Submit
        </button>
        <button
          type="button"
          onClick={resetFunction}
          className="btn btn-secondary"
        >
          Reset
        </button>
      </div>
      <CustomModal2
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Madical History">
				<AddMedicalHistoryForm
					value={""}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal2>
    </form>
  );
};

export default AddPrescriptionForm;
