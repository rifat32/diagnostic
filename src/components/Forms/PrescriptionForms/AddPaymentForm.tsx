import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	amount: string;
  prescription_id:string,
  fees:string;
  paid:number;



}

const AddPrescriptionPaymentForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
	amount: "",
	prescription_id:"",
  fees:"",
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
         prescription_id:formData.prescription_id
        
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
		
        let paid = 0.0;
        props.value.payments.map((el:any) => {
        paid+= parseFloat(el.amount)
        })
        setFormData(
          {...formData,
            prescription_id: props.value.id,
            fees:props.value.fees,
            paid
          
          });
		}

	}, []);
	const updateData = () => {
		apiClient()
			.post(`${BACKENDAPI}/v1.0/prescription-payment`, { ...formData })
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
		
		<>
		<form className="row g-3" onSubmit={handleSubmit}>
		<div className="col-md-4">
      Total fee: {formData.fees} <br />
      Total paid: {formData.paid}
    </div>
			<div className="col-md-4">
				<label htmlFor="amount" className="form-label">
        Amount
				</label>
				<input
					type="text"
					className={
						errors
							? errors.amount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="amount"
					name="amount"
					onChange={handleChange}
					value={formData.amount}
				/>
				{errors?.name && (
					<div className="invalid-feedback">{errors.amount[0]}</div>
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
		<hr />
		<div>
<h3 className="text-center">All Payments</h3>
			<table className="table">
				<thead>
					<th>Date</th>
					<th>Amount</th>
				</thead>
				<tbody>
				{props.value.payments.map((el:any) => {
       return <tr>
		<td>{new Date(el.created_at).toDateString()}</td>
		<td>{el.amount}</td>
	   </tr>
	})}
				</tbody>
				
			</table>
		
		</div>
		
		</>
	);
};

export default AddPrescriptionPaymentForm;
