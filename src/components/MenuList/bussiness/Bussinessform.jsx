import MaterialTable from "../../MaterialTable";




const BusinessForm = () => {
  const columns = [
    { label: "Business Name", field: "BusinessName" },
    { label: "Business Mail", field: "BusinessMail" },
    { label: "Business Phone", field: "BusinessPhone" },
    { label: "Business Address", field: "BusinessAddress" },
  ];

  const ClientFormData = [
    { id: 1, BusinessName: "John Doe", BusinessMail: "john@example.com" , BusinessPhone : "7093188460", BusinessAddress:"Hyderabad"},
    { id: 1, BusinessName: "Sreekanth", BusinessMail: "Sreekanth@example.com" , BusinessPhone : "7093188460", BusinessAddress:"Hyderabad"},
    { id: 1, BusinessName: "Sreenu", BusinessMail: "Sreenu@example.com" , BusinessPhone : "7093188460", BusinessAddress:"Hyderabad"},
    { id: 1, BusinessName: "Anjali", BusinessMail: "Anjali@example.com" , BusinessPhone : "7093188460", BusinessAddress:"Hyderabad"},
    { id: 1, BusinessName: "Vamsi", BusinessMail: "Vamsi@example.com" , BusinessPhone : "7093188460", BusinessAddress:"Hyderabad"},
  ];

  return (
    <div>
      <MaterialTable columns={columns} initialData={ClientFormData} />
    </div>
  )
 };

export default BusinessForm;
