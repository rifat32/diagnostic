

export enum ROUTE_LIST {
    createPatient= "/admin/patients/create",
    createDoctor="/admin/doctors/create",
    listDoctors="/admin/doctors",
    createAppointment="/admin/appointments/create",
    listAppointment="/admin/appointments",
    createReportTemplate="/admin/report-templates/create",
    listReportTemplate="/admin/report-templates",
    listPrescrption="/admin/prescription",
    listDuePrescrption="/admin/prescription-due",
    createPrescrption="/admin/prescription/create/:appointmentId",
    viewPatientPrescriptionHistory="/admin/patient/prescription-history/:patientId",
    viewPatientTreatmentPlanHistory="/admin/patient/treatment-plan-history/:patientId"
    
  }

