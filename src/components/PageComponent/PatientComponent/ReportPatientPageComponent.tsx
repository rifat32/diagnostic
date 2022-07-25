import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddProductForm from "../../Forms/ProductForms/AddProductForm";
import { toast } from "react-toastify";
import AddPatientForm from "../../Forms/PatientForms/AddPatientForm";
import { withRouter } from "react-router-dom";

const ListPatientsPageComponent: React.FC = (props:any) => {
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/patients`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	const updateDataStates = (updatedData: any) => {
		const tempDatas = data.map((el: any) => {
			if (parseInt(el.id) === parseInt(updatedData.id)) {
				return updatedData;
			}
			return el;
		});
		setData(tempDatas);
	};

	useEffect(() => {
		loadData(link);
	}, []);

	// pagination required
	const loadData = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response.data.data);
				setData([...data, ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/patients/${id}`)
				.then((response: any) => {
					console.log(response);
					const tempDatas = data.filter((el: any) => {
						return el.id !== id;
					});
					setData(tempDatas);
					toast.success("data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	};



	const[dateSearch,setDateSearch] = useState<any>({
		from:"",
		to:""
	})
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDateSearch({
			...dateSearch,
			[e.target.name]:e.target.value
		})
	
	}
	const handleDateSearch = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/patients/date/${dateSearch.from}/${dateSearch.to}`)
			.then((response: any) => {
				console.log(response.data.data);
				setData([ ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {

				console.log(error.response);
			});
        }
	
	return (
		<>
   <div className="row mt-2">
		<div className="col-6 offset-3">
			<div className="row">
				<div className="col-4">
				<input type="date" className="form-control" name="from" value={dateSearch.from} onChange={handleDateChange}/>
				</div>
				<div className="col-1">
				--
				</div>
				<div className="col-4">
				<input type="date" className="form-control" name="to" value={dateSearch.to} onChange={handleDateChange}/>
				</div>
				<div className="col-2">
				<button type="button" onClick={handleDateSearch} className="btn btn-primary"> filter</button>
				</div>
			</div>
		</div>
	</div>
			<table className="table">
				<thead>
					<tr>
					
						<th scope="col">Id</th>
						<th scope="col">Name</th>
						<th scope="col">Phone</th>
						<th scope="col">Address</th>
						<th scope="col">Sex</th>
						<th scope="col">Birth Date</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{el.name && el.name}</td>
									<td>{el.phone && el.phone}</td>
									<td>{el.address && el.address}</td>
									<td>{el.sex && el.sex}</td>
									<td>{el.birth_date && el.birth_date}</td>
									
						
									<td>
										<div className="btn-group">
											<button
												type="button"
												className="btn btn-sm btn-primary dropdown-toggle"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												Action
											</button>
											<ul className="dropdown-menu action">
												<li>
													<a
														onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}
														className="dropdown-item"
														href="#">
														edit
													</a>
												</li>
												<li>
													<a
														onClick={() => {
															props.history.push(`/admin/patient/history/${el.id}`);
														}}
														className="dropdown-item"
														href="#">
														view history
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a
														onClick={() => {
															deleteData(el.id);
														}}
														className="dropdown-item"
														href="#">
														delete
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
											</ul>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			<div className="text-center">
				{nextPageLink ? (
					<button
						className="btn btn-primary"
						onClick={() => {
							loadData(nextPageLink);
						}}>
						Load More ...
					</button>
				) : data.length ? (
					prevPageLink ? (
						"No more data to show"
					) : (
						""
					)
				) : (
					"No data to show"
				)}
			</div>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Update Bank">
				<AddPatientForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default withRouter(ListPatientsPageComponent);
