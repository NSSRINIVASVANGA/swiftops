import React from "react";
import MaterialTable from "../../MaterialTable";

const ClientForm = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" }
  ];

  const ClientFormData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Brown", email: "alice@example.com" },
    { id: 4, name: "Bob White", email: "bob@example.com" }
  ];

  const handleUpdate = (user) => {
    alert(`Update user: ${user.name}`);
  };

  return (
    <div>
      <h2>ClientForm Table</h2>
      <MaterialTable columns={columns} initialData={ClientFormData} onUpdate={handleUpdate} />
    </div>
  );
};

export default ClientForm;
