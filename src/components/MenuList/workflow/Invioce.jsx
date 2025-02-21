import MaterialTable from "../../MaterialTable";
import { Button } from "@mui/material";

const InvoiceTable = () => {
  const invoices = [
    {
      invoice_id: "1",
      business_id: "101",
      client_id: "201",
      invoice_number: "INV-001",
      invoice_date: "2024-02-15",
      due_date: "2024-03-15",
      total_amount: 1500.0,
      status: "Draft",
      created_at: "2024-02-10",
      updated_at: "2024-02-12",
    },
    {
      invoice_id: "2",
      business_id: "102",
      client_id: "202",
      invoice_number: "INV-002",
      invoice_date: "2024-02-10",
      due_date: "2024-03-10",
      total_amount: 2500.0,
      status: "Sent",
      created_at: "2024-02-08",
      updated_at: "2024-02-11",
    },
    {
      invoice_id: "3",
      business_id: "103",
      client_id: "203",
      invoice_number: "INV-003",
      invoice_date: "2024-02-12",
      due_date: "2024-03-12",
      total_amount: 2500.0,
      status: "Sent",
      created_at: "2024-02-08",
      updated_at: "2024-02-11",
    },
    {
      invoice_id: "4",
      business_id: "104",
      client_id: "204",
      invoice_number: "INV-004",
      invoice_date: "2024-02-14",
      due_date: "2024-03-14",
      total_amount: 2500.0,
      status: "Sent",
      created_at: "2024-02-08",
      updated_at: "2024-02-11",
    },
  ];

  const handleViewClick = (invoice) => {
    alert(`Viewing Invoice: ${invoice.invoice_number}`);
    // You can navigate to a details page: window.location.href = `/invoices/${invoice.invoice_id}`;
  };

  const columns = [
    { label: "Invoice ID", field: "invoice_id" },
    { label: "Invoice Number", field: "invoice_number" },
    { label: "Due Date", field: "due_date" },
    { label: "Total Amount", field: "total_amount" },
    
  ];

  return (
    <div>
      <MaterialTable columns={columns} initialData={invoices} />
    </div>
  );
};

export default InvoiceTable;
