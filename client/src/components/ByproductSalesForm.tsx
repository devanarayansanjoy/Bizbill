import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ByproductSalesForm() {
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const totalAmount = quantity && unitPrice ? 
    (parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2) : "0.00";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Byproduct sale:", { productName, customerName, quantity, unitPrice, totalAmount });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Byproduct Sale Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="byproduct-name">Byproduct Name</Label>
              <Input
                id="byproduct-name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter byproduct name"
                data-testid="input-byproduct-name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                data-testid="input-customer-name"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sale-date">Sale Date</Label>
              <Input
                id="sale-date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                data-testid="input-sale-date"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                data-testid="input-quantity"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit-price">Unit Price</Label>
              <Input
                id="unit-price"
                type="number"
                step="0.01"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0.00"
                data-testid="input-unit-price"
                required
              />
            </div>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Amount:</span>
              <span className="text-xl font-mono font-semibold" data-testid="text-total-amount">
                ₹{totalAmount}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" data-testid="button-submit-byproduct">
            Generate Byproduct Invoice
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
