import CreditManagement from "@/components/CreditManagement";

export default function CreditPage() {
  const mockCreditSales = [
    { id: "1", invoiceNumber: "INV-2024-001", partyName: "ABC Industries", date: "2024-01-15", total: 25000, paid: 15000, balance: 10000, status: "partial" as const },
    { id: "2", invoiceNumber: "INV-2024-002", partyName: "XYZ Corp", date: "2023-12-28", total: 18000, paid: 0, balance: 18000, status: "overdue" as const },
    { id: "3", invoiceNumber: "INV-2024-003", partyName: "Global Traders", date: "2024-01-10", total: 12500, paid: 0, balance: 12500, status: "pending" as const },
  ];

  const mockCreditPurchases = [
    { id: "4", invoiceNumber: "BILL-2024-001", partyName: "Material Suppliers Ltd", date: "2024-01-10", total: 30000, paid: 20000, balance: 10000, status: "partial" as const },
    { id: "5", invoiceNumber: "BILL-2024-002", partyName: "Raw Materials Co", date: "2024-01-12", total: 15000, paid: 0, balance: 15000, status: "pending" as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Credit Management</h1>
        <p className="text-muted-foreground">Track credit sales and purchases</p>
      </div>
      <CreditManagement creditSales={mockCreditSales} creditPurchases={mockCreditPurchases} />
    </div>
  );
}
