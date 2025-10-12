import CreditManagement from '../CreditManagement';

export default function CreditManagementExample() {
  const mockCreditSales = [
    { id: "1", invoiceNumber: "INV-2024-001", partyName: "ABC Industries", date: "2024-01-15", total: 25000, paid: 15000, balance: 10000, status: "partial" as const },
    { id: "2", invoiceNumber: "INV-2024-002", partyName: "XYZ Corp", date: "2023-12-28", total: 18000, paid: 0, balance: 18000, status: "overdue" as const },
  ];

  const mockCreditPurchases = [
    { id: "3", invoiceNumber: "BILL-2024-001", partyName: "Material Suppliers Ltd", date: "2024-01-10", total: 30000, paid: 20000, balance: 10000, status: "partial" as const },
    { id: "4", invoiceNumber: "BILL-2024-002", partyName: "Raw Materials Co", date: "2024-01-12", total: 15000, paid: 0, balance: 15000, status: "pending" as const },
  ];

  return <CreditManagement creditSales={mockCreditSales} creditPurchases={mockCreditPurchases} />;
}
