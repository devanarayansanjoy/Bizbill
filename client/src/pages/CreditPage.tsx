import { useQuery } from "@tanstack/react-query";
import CreditManagement from "@/components/CreditManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface Sale {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone?: string;
  date: Date;
  totalAmount: string;
  paidAmount: string;
  status: string;
  isCredit: boolean;
  alertFrequency?: string;
}

interface Purchase {
  id: string;
  billNumber: string;
  vendorName: string;
  vendorPhone?: string;
  date: Date;
  totalAmount: string;
  paidAmount: string;
  status: string;
  isCredit: boolean;
  alertFrequency?: string;
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

  // Calculate Due Reminders Today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueReminders = allSales
    .filter(s => s.isCredit && (s.status === "pending" || s.status === "partial") && s.alertFrequency && s.alertFrequency !== "none")
    .filter(s => {
      const saleDate = new Date(s.date);
      saleDate.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(today.getTime() - saleDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return false; // Don't remind on the day of purchase
      if (s.alertFrequency === "daily") return true;
      if (s.alertFrequency === "weekly" && diffDays % 7 === 0) return true;
      if (s.alertFrequency === "monthly" && diffDays % 30 === 0) return true;
      return false;
    });

  const generateWhatsAppLink = (sale: Sale) => {
    const shopName = typeof window !== 'undefined' ? localStorage.getItem("bizbillpro_shop_name") || "Shop Name" : "Shop Name";
    const balance = parseFloat(sale.totalAmount) - parseFloat(sale.paidAmount);
    const dateStr = new Date(sale.date).toLocaleDateString();
    
    const text = `🚨 *PAYMENT ALERT: ${shopName}* 🚨\nHello ${sale.customerName}, this is a reminder regarding your pending balance.\n\n*Purchase Date:* ${dateStr}\n*Balance Due:* ₹${balance.toLocaleString()}\n\nPlease clear your dues at your earliest convenience. Thank you!`;
    
    // Format phone number (remove spaces, ensure it starts with country code, assuming India +91 if length is 10)
    let phone = sale.customerPhone?.replace(/\D/g, '') || '';
    if (phone.length === 10) phone = `91${phone}`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Credit Management</h1>
        <p className="text-muted-foreground">Track credit sales and purchases</p>
      </div>

      {dueReminders.length > 0 && (
        <Card className="border-red-200 shadow-sm bg-red-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-red-700">
              <MessageCircle className="h-5 w-5" />
              Due Reminders Today ({dueReminders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dueReminders.map(sale => {
                const balance = parseFloat(sale.totalAmount) - parseFloat(sale.paidAmount);
                return (
                  <div key={sale.id} className="flex items-center justify-between bg-white p-3 rounded-md border text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{sale.customerName}</p>
                      <p className="text-gray-500 font-mono text-xs mt-0.5">#{sale.invoiceNumber} • ₹{balance.toLocaleString()} due</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open(generateWhatsAppLink(sale), '_blank')}
                      disabled={!sale.customerPhone}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {sale.customerPhone ? 'Send WhatsApp' : 'No Phone Added'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <CreditManagement creditSales={creditSales} creditPurchases={creditPurchases} />
    </div>
  );
}
