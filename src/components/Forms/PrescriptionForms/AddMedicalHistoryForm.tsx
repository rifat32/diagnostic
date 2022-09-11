import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	
	diseases: any[];
	
}


const AddMedicalHistoryForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		
		diseases: [
			{
				id:1,
				name:"DM",
				checked:false
			},
			{
				id:2,
				name:"HTN",
				checked:false
			},
			{
				id:3,
				name:"Asthma",
				checked:false
			},
			{
				id:4,
				name:"BT",
				checked:false
			},
			{
				id:5,
				name:"CT",
				checked:false
			}
			,
			{
				id:6,
				name:"IHD",
				checked:false
			}
			,
			{
				id:7,
				name:"CKD",
				checked:false
			}
			,
			{
				id:8,
				name:"HBs Ag",
				checked:false
			}
			,
			{
				id:9,
				name:"HCV",
				checked:false
			}
			,
			{
				id:10,
				name:"HIV",
				checked:false
			}
			,
			{
				id:11,
				name:"TB",
				checked:false
			}
			,
			{
				id:12,
				name:"Allergy",
				checked:false
			},
			{
				id:13,
				name:"Revealed Normal",
				checked:false
			},
			{
				id:14,
				name:"Others",
				checked:false
			}
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
			
			diseases: [
				{
					id:1,
					name:"DM",
					checked:false
				},
				{
					id:2,
					name:"HTN",
					checked:false
				},
				{
					id:3,
					name:"Asthma",
					checked:false
				},
				{
					id:4,
					name:"BT",
					checked:false
				},
				{
					id:5,
					name:"CT",
					checked:false
				}
				,
				{
					id:6,
					name:"IHD",
					checked:false
				}
				,
				{
					id:7,
					name:"CKD",
					checked:false
				}
				,
				{
					id:8,
					name:"HBs Ag",
					checked:false
				}
				,
				{
					id:9,
					name:"HCV",
					checked:false
				}
				,
				{
					id:10,
					name:"HIV",
					checked:false
				}
				,
				{
					id:11,
					name:"TB",
					checked:false
				}
				,
				{
					id:12,
					name:"Allergy",
					checked:false
				},
				{
					id:13,
					name:"Revealed Normal",
					checked:false
				},
				{
					id:14,
					name:"Others",
					checked:false
				}
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
				
		
		
			<div className="col-md-12">
				
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
