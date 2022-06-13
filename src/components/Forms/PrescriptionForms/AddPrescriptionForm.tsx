import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
  description: string;
  prescription: Prescription[];
  tests: Test[];
  note: string;
  patient_id: string;
}
interface Prescription {
  id: string;
  product_id: string;
  product_name: string;
}
interface Test {
  name: string;
}
const AddPrescriptionForm: React.FC<UpdateFormInterface> = (props) => {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    prescription: [],
    note: "",
    patient_id: "",
    tests: [{ name: "" }],
  });

  const [errors, setErrors] = useState<any>(null);
  const [patients, setPatients] = useState([]);
  const loadPatients = () => {
    apiClient()
      .get(`${BACKENDAPI}/v1.0/patients/all`)
      .then((response: any) => {
        console.log(response);
        setPatients(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    loadPatients();
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
    if (e.target.name == "patient_id") {
      patients.map((el: any) => {
        if (parseInt(el.id) === parseInt(e.target.value)) {
          setCurrentPatient(el);
        }
      });
    }
  };
  const resetFunction = () => {
    setFormData({
      description: "",
      prescription: [],
      note: "",
      patient_id: "",
      tests: [{ name: "" }],
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
        tempValues.push({
          id: "0",
          product_id: product.id,
          product_name: product.name,
        });

        setFormData({ ...formData, prescription: tempValues });
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
      .post(`${BACKENDAPI}/v1.0/doctors`, { ...formData })
      .then((response) => {
        console.log(response);
        toast.success("Data saved");
        resetFunction();
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
      setFormData(props.value);
    }
  }, []);
  const updateData = () => {
    apiClient()
      .put(`${BACKENDAPI}/v1.0/doctors`, { ...formData })
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
  const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index: number = parseInt(e.target.name.split(".")[1]);
    let name: string = e.target.name.split(".")[2];
    console.log(index);
    const tempValues: any = [...formData.tests];
    console.log(name);
    tempValues[index][name] = e.target.value;
    setFormData({ ...formData, tests: tempValues });
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
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-3">
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
            value={formData.patient_id}
          >
            <option value="">Please Select</option>
            {patients.map((el: any, index) => (
              <option
                key={index}
                value={el.id}
                style={{ textTransform: "uppercase" }}
              >
                {el.name}
              </option>
            ))}
          </select>

          {errors?.patient_id && (
            <div className="invalid-feedback">{errors.patient_id[0]}</div>
          )}
          {errors && <div className="valid-feedback">Looks good!</div>}
        </div>
		<div className="col-md-9">
		{currentPatient ? (
          <div className="row ">
            <div className="col-12 ">
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
        ) : null}
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
        <div className="col-md-5"></div>
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-12">
              <p>Search Product</p>
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
            </div>
			<div className="col-12">
       
            <h3 className="text-center">Medicines</h3>
        
          <div className="row bg-primary container">
            <div className="col-md-2">
              <p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Name</p>
            </div>
            <div className="col-md-2">
			<p className="text-light mt-1" style={{fontSize:"0.8rem"}} >Action</p>
            </div>
          </div>
          <div className="row">
            {formData.prescription.map((el, index) => {
              return (
                <div className="col-12">
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
                </div>
              );
            })}
          </div>
        </div>



          </div>
        </div>
      </div>

      <br />
      <div className="row">
        
      </div>

      <div className="row mt-5">
        <div className="col-10 offset-1">
          <div className="row">
            <h3 className="text-center">Tests</h3>
          </div>
          <div className="row bg-primary container">
            <div className="col-md-2">
              <h5 className="text-light mt-2">Name</h5>
            </div>
            <div className="col-md-2">
              <h5 className="text-light mt-2">Action</h5>
            </div>
          </div>
          <div className="row">
            {formData.tests.map((el, index) => {
              return (
                <div className="col-12">
                  <br />
                  <div className="row">
                    <div className="col-md-2">
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
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeTestsElement(index)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="text-center">
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

      <div className="col-md-12">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className={
            errors
              ? errors.description
                ? `form-control is-invalid`
                : `form-control is-valid`
              : "form-control"
          }
          id="description"
          name="description"
          onChange={handleTextareaChange}
          value={formData.description}
          rows={10}
        ></textarea>

        {errors?.name && (
          <div className="invalid-feedback">{errors.name[0]}</div>
        )}
        {errors && <div className="valid-feedback">Looks good!</div>}
      </div>

      <div className="col-md-12">
        <label htmlFor="note" className="form-label">
          Note
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
          rows={3}
        ></textarea>

        {errors?.name && (
          <div className="invalid-feedback">{errors.name[0]}</div>
        )}
        {errors && <div className="valid-feedback">Looks good!</div>}
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
    </form>
  );
};

export default AddPrescriptionForm;
