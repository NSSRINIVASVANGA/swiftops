import MaterialTable from "../../MaterialTable";

const Appointments = () => {
  const columns = [
    { label: "Business Name", field: "BusinessName" },
    { label: "Appointment From", field: "AppointmentFrom" },
    { label: "Appointment To", field: "AppointmentTo" },
    { label: "Appointment Type", field: "AppointmentType" },
    { label: "Status", field: "Status" },
  ];

  const ClientFormData = [
    { id: 1, BusinessName: "John Doe", AppointmentFrom: "26/02/2025" , AppointmentTo : "28/02/2025", AppointmentType:"Project", Status: "Scheduled"},
    { id: 2, BusinessName: "Vinay", AppointmentFrom: "26/02/2025" , AppointmentTo : "28/02/2025", AppointmentType:"Project", Status: "Scheduled"},
    { id: 3, BusinessName: "Sriram", AppointmentFrom: "26/02/2025" , AppointmentTo : "28/02/2025", AppointmentType:"Class", Status: "Scheduled"},
    { id: 4, BusinessName: "Shan", AppointmentFrom: "26/02/2025" , AppointmentTo : "28/02/2025", AppointmentType:"Project", Status: "Scheduled"},
    { id: 5, BusinessName: "Sai", AppointmentFrom: "26/02/2025" , AppointmentTo : "28/02/2025", AppointmentType:"Project", Status: "Scheduled"},
  ];

  return (
    <div>
      <MaterialTable columns={columns} initialData={ClientFormData} />
    </div>
  )
 };

export default Appointments;