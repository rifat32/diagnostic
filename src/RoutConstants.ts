

export enum ROUTE_LIST {
    createPatient= "/admin/patients/create",
    createDoctor="/admin/doctors/create",
    listDoctors="/admin/doctors",
    createAppointment="/admin/appointments/create",
    listAppointment="/admin/appointments",
    createReportTemplate="/admin/report-templates/create",
    listReportTemplate="/admin/report-templates",
    listPrescrption="/admin/prescription",
    createPrescrption="/admin/prescription/create/:appointmentId",
    viewPatientHistory="/admin/patient/history/:patientId"
  }

