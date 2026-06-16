import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceData {
  id: string;
  invoiceNumber?: string;
  billNumber?: string;
  customerName?: string;
  vendorName?: string;
  customerPhone?: string;
  vendorPhone?: string;
  totalAmount: string;
  paidAmount: string;
  date: string;
  status: string;
}

interface InvoicePreviewProps {
  type: "Sale" | "Purchase";
  data: InvoiceData;
}

export default function InvoicePreview({ type, data }: InvoicePreviewProps) {
  const { toast } = useToast();
  const partyName = type === "Sale" ? data.customerName : data.vendorName;
  const partyPhone = type === "Sale" ? data.customerPhone : data.vendorPhone;
  const number = type === "Sale" ? data.invoiceNumber : data.billNumber;
  const balance = parseFloat(data.totalAmount) - parseFloat(data.paidAmount);

  const handlePrint = () => {
    const originalTitle = document.title;
    // Set a clean filename for the PDF save dialog
    document.title = `${type}_${number}_${(partyName || '').replace(/\s+/g, '_')}`;
    window.print();
    
    // Revert the title back after the print dialog is triggered
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  const handleShare = async () => {
    const shopName = typeof window !== 'undefined' ? localStorage.getItem("bizbillpro_shop_name") || "Shop Name" : "Shop Name";
    const text = `${shopName} ${type} Invoice\nNumber: ${number}\nDate: ${new Date(data.date).toLocaleDateString()}\nParty: ${partyName}${partyPhone ? `\nPhone: ${partyPhone}` : ''}\nTotal Amount: ₹${parseFloat(data.totalAmount).toLocaleString()}\nBalance Due: ₹${balance.toLocaleString()}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${number}`,
          text: text,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Invoice details copied to clipboard as sharing is not natively supported on this device.",
      });
    }
  };

  return (
    <div className="space-y-4 pt-4">
      {/* Actions Toolbar - Hidden on Print */}
      <div className="flex justify-end gap-2 print:hidden mr-6">
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          Print / Save PDF
        </Button>
      </div>

      {/* Invoice Document */}
      <div className="invoice-document bg-white p-8 border rounded-lg shadow-sm text-black">
        <div className="flex justify-between items-start mb-8 border-b pb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary">
              {typeof window !== 'undefined' ? localStorage.getItem("bizbillpro_shop_name") || "Shop Name" : "Shop Name"}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Your Trusted Business Partner</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800">{type === "Sale" ? "INVOICE" : "PURCHASE BILL"}</h1>
            <p className="font-mono mt-1 text-gray-600">#{number}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm text-gray-500 font-semibold mb-1">{type === "Sale" ? "Bill To:" : "Bill From:"}</p>
            <p className="text-lg font-medium">{partyName}</p>
            {partyPhone && <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">📞 {partyPhone}</p>}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-semibold mb-1">Date:</p>
            <p className="text-lg font-medium">{new Date(data.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300 text-gray-700">
                <th className="py-3 font-semibold">Description</th>
                <th className="py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4">Summary Bill for {type}</td>
                <td className="py-4 text-right font-mono">₹{parseFloat(data.totalAmount).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-8">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-mono">₹{parseFloat(data.totalAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Amount Paid:</span>
              <span className="font-mono text-green-600">-₹{parseFloat(data.paidAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-3 border-t border-gray-300">
              <span>Balance Due:</span>
              <span className="font-mono text-red-600">₹{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-gray-500 border-t pt-8">
          <p>Thank you for your business!</p>
          <p className="mt-1">Generated by BillMaster on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
