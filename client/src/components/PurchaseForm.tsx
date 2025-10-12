import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

interface LineItem {
  id: string;
  material: string;
  quantity: string;
  rate: string;
  amount: string;
}

export default function PurchaseForm() {
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", material: "", quantity: "", rate: "", amount: "0" }
  ]);
  const [isCredit, setIsCredit] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      material: "", 
      quantity: "", 
      rate: "", 
      amount: "0" 
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          const qty = parseFloat(field === "quantity" ? value : updated.quantity) || 0;
          const rate = parseFloat(field === "rate" ? value : updated.rate) || 0;
          updated.amount = (qty * rate).toFixed(2);
        }
        return updated;
      }
      return item;
    }));
  };

  const total = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const balance = isCredit ? total - (parseFloat(paidAmount) || 0) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purchase submitted:", { vendorName, items, total, isCredit, paidAmount, balance });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Vendor Name</Label>
              <Input
                id="vendor-name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="Enter vendor name"
                data-testid="input-vendor-name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bill-date">Bill Date</Label>
              <Input
                id="bill-date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                data-testid="input-bill-date"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Materials</CardTitle>
          <Button type="button" size="sm" onClick={addItem} data-testid="button-add-material">
            <Plus className="h-4 w-4 mr-1" />
            Add Material
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="grid gap-3 md:grid-cols-[2fr,1fr,1fr,1fr,auto] items-end">
                <div className="space-y-2">
                  <Label>Material Name</Label>
                  <Input
                    value={item.material}
                    onChange={(e) => updateItem(item.id, "material", e.target.value)}
                    placeholder="Material name"
                    data-testid={`input-material-${index}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                    placeholder="0"
                    data-testid={`input-quantity-${index}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                    placeholder="0.00"
                    data-testid={`input-rate-${index}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    value={item.amount}
                    readOnly
                    className="font-mono bg-muted"
                    data-testid={`text-amount-${index}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  data-testid={`button-remove-${index}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="credit-purchase">Credit Purchase</Label>
            <Switch
              id="credit-purchase"
              checked={isCredit}
              onCheckedChange={setIsCredit}
              data-testid="switch-credit-purchase"
            />
          </div>

          {isCredit && (
            <div className="space-y-2">
              <Label htmlFor="paid-amount">Paid Amount</Label>
              <Input
                id="paid-amount"
                type="number"
                step="0.01"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                placeholder="0.00"
                data-testid="input-paid-amount"
              />
            </div>
          )}

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-lg">
              <span className="font-medium">Total:</span>
              <span className="font-mono font-semibold" data-testid="text-total">₹{total.toFixed(2)}</span>
            </div>
            {isCredit && (
              <div className="flex justify-between text-lg text-destructive">
                <span className="font-medium">Balance Due:</span>
                <span className="font-mono font-semibold" data-testid="text-balance">₹{balance.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" data-testid="button-submit-purchase">
            Record Purchase
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
