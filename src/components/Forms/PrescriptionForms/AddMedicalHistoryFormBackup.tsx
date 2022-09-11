import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	undergoing_treatment:boolean;
	diseases: any[];
	allergies: any[];
	treated: any[];
	female: any[];
	
	local_anaesthetics:boolean;
	prolonged_bleeding:boolean;
	penicillin_given:boolean;
	taking_medicines:boolean;
	nature_of_medication:string;
	recieved_radiotherapy:boolean;
	smoke:boolean;
	smoke_times:string;
	other_information:string;
}


const AddMedicalHistoryForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		undergoing_treatment:false,
		local_anaesthetics:false,
		prolonged_bleeding:false,
		penicillin_given:false,
		taking_medicines:false,
		nature_of_medication:"",
		recieved_radiotherapy:false,
		smoke:false,
		smoke_times:"",
		other_information:"",
		diseases: [
			{
				id:1,
				name:"heart disease",
				checked:false
			},
			{
				id:2,
				name:"Jaundice",
				checked:false
			},
			{
				id:3,
				name:"Hepatitis",
				checked:false
			},
			{
				id:4,
				name:"Diabetes",
				checked:false
			},
			{
				id:5,
				name:"Anaemia",
				checked:false
			}
			,
			{
				id:6,
				name:"Kidney Trouble",
				checked:false
			}
			,
			{
				id:7,
				name:"Rheumatic Fever",
				checked:false
			}
			,
			{
				id:8,
				name:"Raised Blood Pressure",
				checked:false
			}
			,
			{
				id:9,
				name:"Tuberculosis",
				checked:false
			}
			,
			{
				id:10,
				name:"Asthma, hay fever or other allergies",
				checked:false
			}
			,
			{
				id:11,
				name:"Familiar or acquired bleeding tendencies",
				checked:false
			}
			,
			{
				id:12,
				name:"Any other serious illnesses",
				checked:false
			}
		],
		allergies: [
			{
				id:1,
				name:"Penicillin",
				checked:false
			},
			{
				id:2,
				name:"Other Medicines or tablets",
				checked:false
			},
			{
				id:3,
				name:"Substances or chamicals",
				checked:false
			},
			
		],
		treated: [
			{
				id:1,
				name:"Cartisone (Hydrocortisone, Prednisone etc.)",
				checked:false
			},
			{
				id:2,
				name:"Blood - thinning medication",
				checked:false
			},
			{
				id:3,
				name:"Antidepressants",
				checked:false
			},
			
		],
		female: [
			{
				id:1,
				name:"Are you pregnant now?",
				checked:false
			},
			{
				id:2,
				name:"Are you practicing birth control?",
				checked:false
			},
			{
				id:3,
				name:"Do you anticipate becoming pregnant?",
				checked:false
			},
			
		],
		
  
	
	});
	
	const [errors, setErrors] = useState<any>(null);

	useEffect(() => {
		if(props.value) {
			setFormData(JSON.parse(props.value))
		}
		
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	
	const resetFunction = () => {
		setFormData({
			undergoing_treatment:false,
			local_anaesthetics:false,
			prolonged_bleeding:false,
			penicillin_given:false,
			taking_medicines:false,
			nature_of_medication:"",
			recieved_radiotherapy:false,
			smoke:false,
			smoke_times:"",
			other_information:"",
			diseases: [
				{
					id:1,
					name:"heart disease",
					checked:false
				},
				{
					id:2,
					name:"Jaundice",
					checked:false
				},
				{
					id:3,
					name:"Hepatitis",
					checked:false
				},
				{
					id:4,
					name:"Diabetes",
					checked:false
				},
				{
					id:5,
					name:"Anaemia",
					checked:false
				}
				,
				{
					id:6,
					name:"Kidney Trouble",
					checked:false
				}
				,
				{
					id:7,
					name:"Rheumatic Fever",
					checked:false
				}
				,
				{
					id:8,
					name:"Raised Blood Pressure",
					checked:false
				}
				,
				{
					id:9,
					name:"Tuberculosis",
					checked:false
				}
				,
				{
					id:10,
					name:"Asthma, hay fever or other allergies",
					checked:false
				}
				,
				{
					id:11,
					name:"Familiar or acquired bleeding tendencies",
					checked:false
				}
				,
				{
					id:12,
					name:"Any other serious illnesses",
					checked:false
				}
			],
			allergies: [
				{
					id:1,
					name:"Penicillin",
					checked:false
				},
				{
					id:2,
					name:"Other Medicines or tablets",
					checked:false
				},
				{
					id:3,
					name:"Substances or chamicals",
					checked:false
				},
				
			],
			treated: [
				{
					id:1,
					name:"Cartisone (Hydrocortisone, Prednisone etc.)",
					checked:false
				},
				{
					id:2,
					name:"Blood - thinning medication",
					checked:false
				},
				{
					id:3,
					name:"Antidepressants",
					checked:false
				},
				
			],
			female: [
				{
					id:1,
					name:"Are you pregnant now?",
					checked:false
				},
				{
					id:2,
					name:"Are you practicing birth control?",
					checked:false
				},
				{
					id:3,
					name:"Do you anticipate becoming pregnant?",
					checked:false
				},
				
			],
		
		});
	};
	const handleSubmit = () => {

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
         amount:formData.diseases,
       
        
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
	
	const updateData = () => {
	
		props.updateDataStates(formData);
		props.showModal(false);
		
	};
	// end edit Data section
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	const handleDynamicChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		// setFormData({ ...formData, [e.target.name]: e.target.checked });

		if (e.target.name === "disease[]") {
			const diseaseId = e.target.value.split("_")[1];
			const tempDiseases = JSON.parse(JSON.stringify(formData.diseases)).map((el:any) => {
                if(parseInt(el.id) == parseInt(diseaseId)) {
					el.checked = e.target.checked
				}
				return el;
			})
			setFormData({
				...formData,
				diseases:tempDiseases
			})
		

		
		}
		if (e.target.name === "allergy[]") {
			const allergyId = e.target.value.split("_")[1];
			const tempAllergies = JSON.parse(JSON.stringify(formData.allergies)).map((el:any) => {
                if(parseInt(el.id) == parseInt(allergyId)) {
					el.checked = e.target.checked
				}
				return el;
			})
			setFormData({
				...formData,
				allergies:tempAllergies
			})
		

		
		}
		if (e.target.name === "treated[]") {
			const treatedId = e.target.value.split("_")[1];
			const tempTreated = JSON.parse(JSON.stringify(formData.treated)).map((el:any) => {
                if(parseInt(el.id) == parseInt(treatedId)) {
					el.checked = e.target.checked
				}
				return el;
			})
			setFormData({
				...formData,
				treated:tempTreated
			})
		

		
		}
		if (e.target.name === "female[]") {
			const femaleId = e.target.value.split("_")[1];
			const tempFemale = JSON.parse(JSON.stringify(formData.female)).map((el:any) => {
                if(parseInt(el.id) == parseInt(femaleId)) {
					el.checked = e.target.checked
				}
				return el;
			})
			setFormData({
				...formData,
				female:tempFemale
			})
		

		
		}
		
		

	
	};
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		// setFormData({ ...formData, [e.target.name]: e.target.checked });

		
			setFormData({
				...formData,
				[e.target.name]:e.target.checked
			})
		

	

	
	};

	
	return (
		<div className="row g-3"  >
				<div className="row">
					<p>
						The following questions are asked in the interests of your safety and any particular precautions that may need to be taken as a result of through knowledge of any previous illnesses or medications. Please, therefore, answer these questions as accurately as you can. If you are in any doubt about how to answer them please do not hesitate to ask.
					</p>
				</div>
			<div className="col-md-12">
				
				<div className="form-check" >
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`undergoing_treatment`}
						   name="undergoing_treatment"
						   value={`undergoing_treatment`}
						   onChange={handleChecked}
						   checked={formData.undergoing_treatment}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`undergoing_treatment`}>
					(1) Are you undergoing any medical treatment at present?
					   </label>
				   </div>
			
			</div>
		
			<div className="col-md-12">
				(2) Do you have, or have you had any of the following?
			<div className="row">
				{
					formData.diseases.map((el:any) =>  (
				
							<div className="col-6">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`disease__${el.id}`}
						   name="disease[]"
						   value={`disease_${el.id}`}
						   onChange={handleDynamicChecked}
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`disease_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
			
			</div>

			<div className="col-md-12">
				(3) Have You suffered allergy or other reactions (Rash, Itchiness etc) to:
			<div className="row">
				{
					formData.allergies.map((el:any) =>  (
				
							<div className="col-4">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`allergy_${el.id}`}
						   name="allergy[]"
						   value={`allergy_${el.id}`}
						   onChange={handleDynamicChecked}
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`disease_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
			
			</div>
		
		
			<div className="col-md-12">
				
				<div className="form-check" >
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`local_anaesthetics`}
						   name="local_anaesthetics"
						   value={`local_anaesthetics`}
						   onChange={handleChecked}
						   checked={formData.local_anaesthetics}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`local_anaesthetics`}>
					(4) Have you ever had any adverse effects from local anaesthetics?
					   </label>
				   </div>
			
			</div>
			<div className="col-md-12">
				
				<div className="form-check" >
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`prolonged_bleeding`}
						   name="prolonged_bleeding"
						   value={`prolonged_bleeding`}
						   onChange={handleChecked}
						   checked={formData.prolonged_bleeding}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`prolonged_bleeding`}>
					(5) Have you ever experienced unusually prononged bleeding after injury or tooth extraction?
					   </label>
				   </div>
			
			</div>
			<div className="col-md-12">
				
				<div className="form-check" >
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`penicillin_given`}
						   name="penicillin_given"
						   value={`penicillin_given`}
						   onChange={handleChecked}
						   checked={formData.penicillin_given}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`penicillin_given`}>
					(6) Have you ever been given penicillin?
					   </label>
				   </div>
			
			</div>
			
			
			<div className="col-md-12">
				
				<div className="form-check" >
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`taking_medicines`}
						   name="taking_medicines"
						   value={`taking_medicines`}
						   onChange={handleChecked}
						   checked={formData.taking_medicines}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`taking_medicines`}>
					(7) Are you taking any medicines,tablets, injections (etc.) at present?
					   </label>
				   </div>
			
			</div>
			<div className="col-md-12">
				<label htmlFor="nature_of_medication" className="form-label">
        If yes can you please indicate the nature of this medication?
				</label>
				<input
					type="text"
					className={
						errors
							? errors.nature_of_medication
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="nature_of_medication"
					name="nature_of_medication"
					onChange={handleChange}
					value={formData.nature_of_medication}
				/>
				{errors?.nature_of_medication && (
					<div className="invalid-feedback">{errors.nature_of_medication[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			
			<div className="col-md-12">
				(8) Have you been treated with any of the following in the past 5 year:?
			<div className="row">
				{
					formData.treated.map((el:any) =>  (
				
							<div className="col-6">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`treated__${el.id}`}
						   name="treated[]"
						   value={`treated_${el.id}`}
						   onChange={handleDynamicChecked}
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`disease_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
			
			</div>
			<div className="col-md-12">
				
				<div className="form-check" >
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`recieved_radiotherapy`}
						   name="recieved_radiotherapy"
						   value={`recieved_radiotherapy`}
						   onChange={handleChecked}
						   checked={formData.recieved_radiotherapy}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`recieved_radiotherapy`}>
					(9) Have you ever recieved radioTherapy?
					   </label>
				   </div>
			
			</div>
			<div className="col-md-12">
				
				<div className="form-check" >
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`smoke`}
						   name="smoke"
						   value={`smoke`}
						   onChange={handleChecked}
						   checked={formData.smoke}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`smoke`}>
					(10) Do you smoke?
					   </label>
				   </div>
			
			</div>
			<div className="col-md-12">
				<label htmlFor="smoke_times" className="form-label">
        If yes how much on average per day?
				</label>
				<input
					type="text"
					className={
						errors
							? errors.smoke_times
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="smoke_times"
					name="smoke_times"
					onChange={handleChange}
					value={formData.smoke_times}
				/>
				{errors?.smoke_times && (
					<div className="invalid-feedback">{errors.smoke_times[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			
			<div className="col-md-12">
				(11) For female Patient?
			<div className="row">
				{
					formData.female.map((el:any) =>  (
				
							<div className="col-6">
							<div className="form-check" key={el.id}>
					   <input
						   className="form-check-input"
						   type="checkbox"
						   id={`female_${el.id}`}
						   name="female[]"
						   value={`female_${el.id}`}
						   onChange={handleDynamicChecked}
						   checked={el.checked}
					   />

					   <label
						   className="form-check-label"
						   htmlFor={`female_${el.id}`}>
						   {el.name}
					   </label>
				   </div>
							</div>
					
					   
					 )
					)
				}
					</div>
			
			</div>
			<div className="col-md-12">
				<label htmlFor="smoke_times" className="form-label">
       (12) Please add any other information or comments on your medical history below
				</label>
				<input
					type="text"
					className={
						errors
							? errors.other_information
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="other_information"
					name="other_information"
					onChange={handleChange}
					value={formData.other_information}
				/>
				{errors?.other_information && (
					<div className="invalid-feedback">{errors.other_information[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			
			<div className="row">
					<p>
					To the best of my knowledge, all of the preceding answer are true and corredct. If I ever have any change in my health, or if my medicines change, I will inform the doctor of dentistry at the next appointment without fa
					</p>
				</div>

		
			



			<div className="text-center">
				<button type="button" className="btn btn-primary me-2" onClick={handleSubmit}>
					Submit
				</button>
				<button
					type="button"
					onClick={resetFunction}
					className="btn btn-secondary">
					Reset
				</button>
			</div>
		</div>
	);
};

export default AddMedicalHistoryForm;
