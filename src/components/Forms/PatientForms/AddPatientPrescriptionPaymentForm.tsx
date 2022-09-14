import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	amount: string|number;
  patient_id:string,
  paid_amount:string;
  paid:number;



}

const AddPatientPrescriptionPaymentForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		paid_amount: "",
	patient_id:"",
  amount:"",
  paid:0
  
	
	});
	const [sex, setSex] = useState(["male","female","others"]);
	const [bloodGroup, setBlooodGroup] = useState(["A+","AB","O+"]);
	const [errors, setErrors] = useState<any>(null);

	useEffect(() => {
		
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
      ...formData,
			amount: "",
		
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
			.post(`${BACKENDAPI}/v1.0/patients`, {
         amount:formData.amount,
         prescription_id:formData.patient_id
        
        })
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
		
        // let paid = 0.0;
        // props.value.payments.map((el:any) => {
        // paid+= parseFloat(el.paid_amount)
        // })
        setFormData(
          {...formData,
            patient_id: props.value.id,
            amount:props.value.total_prescription_fees, 
            paid:props.value.total_prescription_paid 
          
          });
		}

	}, []);
	const updateData = () => {
		apiClient()
			.post(`${BACKENDAPI}/v1.0/patient/prescription-payment`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("Payment Added");
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

	return (
		<form className="row g-3" onSubmit={handleSubmit}>
		<div className="col-md-4">
      Total fee: {formData.amount} <br />
      Total paid: {formData.paid}
    </div>
			<div className="col-md-4">
				<label htmlFor="paid_amount" className="form-label">
                     Amount
				</label>
				<input
					type="text"
					className={
						errors
							? errors.paid_amount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="paid_amount"
					name="paid_amount"
					onChange={handleChange}
					value={formData.paid_amount}
				/>
				{errors?.paid_amount && (
					<div className="invalid-feedback">{errors.paid_amount[0]}</div>
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
					className="btn btn-secondary">
					Reset
				</button>
			</div>
		</form>
	);
};

export default AddPatientPrescriptionPaymentForm;
