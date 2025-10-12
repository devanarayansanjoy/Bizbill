import { useQuery } from "@tanstack/react-query";
import CreditManagement from "@/components/CreditManagement";

interface Sale {
  id: string;
  invoiceNumber: string;
  customerName: string;
  date: Date;
  totalAmount: string;
  paidAmount: string;
  status: string;
  isCredit: boolean;
}

interface Purchase {
  id: string;
  billNumber: string;
  vendorName: string;
  date: Date;
  totalAmount: string;
  paidAmount: string;
  status: string;
  isCredit: boolean;
}

export default function CreditPage() {
  const { data: allSales = [] } = useQuery<Sale[]>({
    queryKey: ["/api/sales"],
  });

  const { data: allPurchases = [] } = useQuery<Purchase[]>({
    queryKey: ["/api/purchases"],
  });

  const creditSales = allSales
    .filter(s => s.isCredit)
    .map(s => ({
      id: s.id,
      invoiceNumber: s.invoiceNumber,
      partyName: s.customerName,
      date: new Date(s.date).toLocaleDateString(),
      total: parseFloat(s.totalAmount),
      paid: parseFloat(s.paidAmount),
      balance: parseFloat(s.totalAmount) - parseFloat(s.paidAmount),
      status: s.status as "pending" | "partial" | "overdue",
    }));

  const creditPurchases = allPurchases
    .filter(p => p.isCredit)
    .map(p => ({
      id: p.id,
      invoiceNumber: p.billNumber,
      partyName: p.vendorName,
      date: new Date(p.date).toLocaleDateString(),
      total: parseFloat(p.totalAmount),
      paid: parseFloat(p.paidAmount),
      balance: parseFloat(p.totalAmount) - parseFloat(p.paidAmount),
      status: p.status as "pending" | "partial" | "overdue",
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Credit Management</h1>
        <p className="text-muted-foreground">Track credit sales and purchases</p>
      </div>
      <CreditManagement creditSales={creditSales} creditPurchases={creditPurchases} />
    </div>
  );
}
