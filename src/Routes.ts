import HomePage from "./pages/HomePage/index";
import LoginPage from "./pages/LoginPage/index";
import RegisterPage from "./pages/RegisterPage/index";
import Admin from "./pages/AdminPages/DemoAdmin";
import AddProductPage from "./pages/AdminPages/Product/AddProductPage";
import ListProductPage from "./pages/AdminPages/Product/ListProductPage";
import BrandPage from "./pages/AdminPages/Product/Brand/BrandPage";
import { RouteInterface } from "./interfaces/RoutesInterface";

import AddRequisition from "./pages/AdminPages/Requisition/AddRequisitionPage";
import RequisitionsPage from "./pages/AdminPages/Requisition/RequisitionsPage";
import AddParchasePage from "./pages/AdminPages/Parchase/AddParchasePage";
import ListParchasePage from "./pages/AdminPages/Parchase/ListParchase";
import AddRevenuePage from "./pages/AdminPages/Income/AddRevenuePage";
import ListRevenuePage from "./pages/AdminPages/Income/ListRevenuePage";
import AddCreditNotePage from "./pages/AdminPages/Income/AddCreditNotePage";
import ListCreditNotesPage from "./pages/AdminPages/Income/ListCreditNotesPage";
import CreateBillPage from "./pages/AdminPages/Expense/AddBillPage";
import ListBillsPage from "./pages/AdminPages/Expense/ListBillsPage";
import CreatePaymentPage from "./pages/AdminPages/Expense/AddPaymentPage";
import ListPaymentPage from "./pages/AdminPages/Expense/ListPaymentPage";
import CreateDebitNotePage from "./pages/AdminPages/Expense/AddDebitNotePage";
import ListDebitNotesPage from "./pages/AdminPages/Expense/ListDebitNotesPage";
import CreateWingPage from "./pages/AdminPages/MasterSetup/AddWingPage";
import ListWingsPage from "./pages/AdminPages/MasterSetup/ListWingsPage";
import CreateBankPage from "./pages/AdminPages/MasterSetup/AddBankPage";
import ListBankPage from "./pages/AdminPages/MasterSetup/ListBankPage";
import BankBalancePage from "./pages/AdminPages/Balance/BankBalancePage";
import BankTransferPage from "./pages/AdminPages/Balance/BankTransferPage";
import CreateUserPage from "./pages/AdminPages/UserManagement/CreateUserPage";
import UsersPage from "./pages/AdminPages/UserManagement/UsersPage";
import CreateRolePage from "./pages/AdminPages/UserManagement/CreateRolePage";

import RolesPage from "./pages/AdminPages/UserManagement/RolesPage";
import CreateCharOfAccountPage from "./pages/AdminPages/DoubleEntry/AddAccountPage";
import ChartOfAccountsPage from "./pages/AdminPages/DoubleEntry/ChartOfAccountsPage";
import ListTransfersPageComponent from "./components/PageComponent/BalanceComponent/ListTransfersPageComponent";
import ListTransfersPage from "./pages/AdminPages/Balance/BankTransferHistory";
import RequisitionsReturnPage from "./pages/AdminPages/Requisition/RequisitionsReturnPage";
import RequisitionsReportPage from "./pages/AdminPages/Requisition/RequisitionsReportPage";
import ListParchaseReturnPage from "./pages/AdminPages/Parchase/PurchaseReturnpage";
import PurchaseReportPage from "./pages/AdminPages/Parchase/PurchaseReportPage";
import IncomeReportPage from "./pages/AdminPages/Income/IncomeReportPage";
import ExpenseReportPage from "./pages/AdminPages/Expense/ExpenseReportPage";
import AddPatientPage from "./pages/AdminPages/Patient/AddPatientPage";
import {  ROUTE_LIST } from "./RoutConstants";
import ListPatientsPage from "./pages/AdminPages/Patient/ListPatientsPage";
import AddDoctorPage from "./pages/AdminPages/Doctor/AddDoctorPage";
import ListDoctorPage from "./pages/AdminPages/Doctor/ListDoctorPage";
import AddAppointmentPage from "./pages/AdminPages/Appointment/AddAppointmentPage";
import ListAppointmentPage from "./pages/AdminPages/Appointment/ListAppointmentPage";
import AddReportTemplatePage from "./pages/AdminPages/LaboratoryReports/AddReportTemplatePage";
import ListReportTemplatePage from "./pages/AdminPages/LaboratoryReports/ListReportTemplatePage";
import AddPrescriptionPage from "./pages/AdminPages/Prescription/AddPrescriptionPage";
import AddReportTemplatePage2 from "./pages/AdminPages/LaboratoryReports/AddReportTemplatePage2";
import ListPrescriptionPage from "./pages/AdminPages/Prescription/ListPrescriptionPage";
import ViewPatientHistoryPage from "./pages/AdminPages/Patient/ViewPatientPrescriptionHistoryPage";
import ReportAppointmentPage from "./pages/AdminPages/Appointment/ReportAppointmentPage";
import ReportPrescriptionPage from "./pages/AdminPages/Prescription/ReportPrescriptionPage";
import ReportPatientsPage from "./pages/AdminPages/Patient/ReportPatientsPage";
import AddService from "./pages/AdminPages/Service/AddServicePage";
import ServiceList from "./pages/AdminPages/Service/ListServicePage";
import AddSalePage from "./pages/AdminPages/Sale/AddSalePage";
import ListSalePage from "./pages/AdminPages/Sale/ListSalePage";
import ListMainPatientsPage from "./pages/AdminPages/Patient/ListMainPatientsPage";
import ListDuePrescriptionPage from "./pages/AdminPages/Prescription/ListDuePrescriptionPage";
import ViewPatientPrescriptionHistoryPage from "./pages/AdminPages/Patient/ViewPatientPrescriptionHistoryPage";
import ViewPatientTreatmentPlanHistoryPage from "./pages/AdminPages/Patient/ViewPatientTreatementPlanHistoryPage";


export const RouteData: RouteInterface[] = [
	{
		path: "/",
		exact: true,
		component: HomePage,
	},
	{
		path: "/login",
		exact: false,
		component: LoginPage,
	},
	{
		path: "/register",
		exact: false,
		component: RegisterPage,
	},
	{
		path: "/register",
		exact: false,
		component: RegisterPage,
	},
	{
		path: "/admin",
		exact: true,
		component: Admin,
	},

	// wings
	{
		path: "/admin/wings/create",
		exact: false,
		component: CreateWingPage,
	},
	{
		path: "/admin/wings",
		exact: true,
		component: ListWingsPage,
	},
	// users
	{
		path: "/admin/users/create",
		exact: false,
		component: CreateUserPage,
	},
	{
		path: "/admin/users",
		exact: true,
		component: UsersPage,
	},
	{
		path: "/admin/roles/create",
		exact: false,
		component: CreateRolePage,
	},
	{
		path: "/admin/roles",
		exact: true,
		component: RolesPage,
	},
	// banks
	{
		path: "/admin/banks/create",
		exact: false,
		component: CreateBankPage,
	},
	{
		path: "/admin/banks",
		exact: true,
		component: ListBankPage,
	},

	// Doctor
	{
		path: ROUTE_LIST.createDoctor,
		exact: false,
		component: AddDoctorPage,
	},
	{
		path: ROUTE_LIST.listDoctors,
		exact: true,
		component: ListDoctorPage,
	},

// Prescreiption
{
	path: ROUTE_LIST.createPrescrption,
	exact: false,
	component: AddPrescriptionPage,
},
{
	path: "/admin/prescriptions/edit/:id",
	exact: false,
	component: AddPrescriptionPage,
},

{
	path: ROUTE_LIST.listPrescrption,
	exact: true,
	component: ListPrescriptionPage,
},
{
	path: ROUTE_LIST.listDuePrescrption,
	exact: true,
	component: ListDuePrescriptionPage,
},


	// Patient
	{
		path: ROUTE_LIST.createPatient,
		exact: false,
		component: AddPatientPage,
	},
	{
		path: "/admin/patients",
		exact: true,
		component: ListPatientsPage,
	},
	{
		path: "/admin/patients/main-patients",
		exact: true,
		component: ListMainPatientsPage,
	},
	{
		path: ROUTE_LIST.viewPatientPrescriptionHistory,
		exact: true,
		component: ViewPatientPrescriptionHistoryPage,
	},
	{
		path: ROUTE_LIST.viewPatientTreatmentPlanHistory,
		exact: true,
		component: ViewPatientTreatmentPlanHistoryPage,
	},
	
	
	// Appointment
	{
		path: ROUTE_LIST.createAppointment,
		exact: false,
		component: AddAppointmentPage,
	},
	{
		path: ROUTE_LIST.listAppointment,
		exact: true,
		component: ListAppointmentPage,
	},
	{
		path: "/admin/report/appointment",
		exact: true,
		component: ReportAppointmentPage,
	},
	{
		path: "/admin/report/prescription",
		exact: true,
		component: ReportPrescriptionPage,
	},
	{
		path: "/admin/report/patient",
		exact: true,
		component: ReportPatientsPage,
	},
	
	// // Laboratory Tests
	// {
	// 	path: ROUTE_LIST.createReportTemplate,
	// 	exact: false,
	// 	component: AddReportTemplatePage,
	// },
	// {
	// 	path: ROUTE_LIST.listReportTemplate,
	// 	exact: true,
	// 	component: ListReportTemplatePage,
	// },
	// Laboratory Tests
	// {
	// 	path: ROUTE_LIST.createPrescrption,
	// 	exact: false,
	// 	component: AddReportTemplatePage,
	// },
	// {
	// 	path: `${ROUTE_LIST.createPrescrption}2`,
	// 	exact: false,
	// 	component: AddReportTemplatePage2,
	// },
	// {
	// 	path: ROUTE_LIST.listPrescrption,
	// 	exact: true,
	// 	component: ListReportTemplatePage,
	// },
	// products
	{
		path: "/admin/services/create",
		exact: false,
		component: AddService,
	},
	{
		path: "/admin/services",
		exact: true,
		component: ServiceList,
	},
	{
		path: "/admin/sales/create",
		exact: false,
		component: AddSalePage,
	},
	// aaaaaa
	{
		path: "/admin/sales/edit/:id",
		exact: false,
		component: AddSalePage,
	},
	{
		path: "/admin/prescriptions/edit/:id",
		exact: false,
		component: AddPrescriptionPage,
	},
	// aaaaaaaa
	{
		path: "/admin/sales",
		exact: true,
		component: ListSalePage,
	},


	{
		path: "/admin/products/create",
		exact: false,
		component: AddProductPage,
	},
	{
		path: "/admin/products",
		exact: true,
		component: ListProductPage,
	},
	{
		path: "/admin/brands",
		exact: false,
		component: BrandPage,
	},
	// Requisitions
	{
		path: "/admin/requisitions/create",
		exact: false,
		component: AddRequisition,
	},
	{
		path: "/admin/requisitions",
		exact: true,
		component: RequisitionsPage,
	},
	{
		path: "/admin/requisitions/return",
		exact: false,
		component: RequisitionsReturnPage,
	},
	{
		path: "/admin/requisitions/report",
		exact: false,
		component: RequisitionsReportPage,
	},
	// Parchases
	{
		path: "/admin/purchases/create",
		exact: false,
		component: AddParchasePage,
	},
	{
		path: "/admin/purchases",
		exact: true,
		component: ListParchasePage,
	},
	{
		path: "/admin/purchases/return",
		exact: false,
		component: ListParchaseReturnPage,
	},
	{
		path: "/admin/purchases/report",
		exact: false,
		component: PurchaseReportPage,
	},

	// Incomes
	{
		path: "/admin/revenues/create",
		exact: false,
		component: AddRevenuePage,
	},
	{
		path: "/admin/revenues",
		exact: true,
		component: ListRevenuePage,
	},
	{
		path: "/admin/credits/create",
		exact: false,
		component: AddCreditNotePage,
	},
	{
		path: "/admin/credits",
		exact: true,
		component: ListCreditNotesPage,
	},
	{
		path: "/admin/income/report",
		exact: false,
		component: IncomeReportPage,
	},
	// expense
	{
		path: "/admin/bills/create",
		exact: false,
		component: CreateBillPage,
	},
	{
		path: "/admin/bills",
		exact: true,
		component: ListBillsPage,
	},
	{
		path: "/admin/payments/create",
		exact: false,
		component: CreatePaymentPage,
	},
	{
		path: "/admin/payments",
		exact: true,
		component: ListPaymentPage,
	},
	{
		path: "/admin/debitNotes/create",
		exact: false,
		component: CreateDebitNotePage,
	},
	{
		path: "/admin/debitNotes",
		exact: true,
		component: ListDebitNotesPage,
	},
	{
		path: "/admin/expense/report",
		exact: false,
		component: ExpenseReportPage,
	},
	// Balance
	{
		path: "/admin/bank/balance",
		exact: true,
		component: BankBalancePage,
	},
	{
		path: "/admin/bank/transfer",
		exact: true,
		component: BankTransferPage,
	},
	{
		path: "/admin/bank/transfer/history",
		exact: false,
		component: ListTransfersPage,
	},
	// chart of account
	{
		path: "/admin/chart-of-account/create",
		exact: false,
		component: CreateCharOfAccountPage,
	},
	{
		path: "/admin/chart-of-account/list",
		exact: false,
		component: ChartOfAccountsPage,
	},
];
//
