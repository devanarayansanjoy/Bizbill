import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProductionForm() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [rawMaterialCost, setRawMaterialCost] = useState("");
  const [byproductName, setByproductName] = useState("");
  const [byproductQty, setByproductQty] = useState("");

  const productionRate = rawMaterialCost && quantity ? 
    (parseFloat(rawMaterialCost) / parseFloat(quantity)).toFixed(2) : "0.00";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Production recorded:", { 
      productName, 
      quantity, 
      unit, 
      rawMaterialCost, 
      productionRate,
      byproductName, 
      byproductQty 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Production Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                data-testid="input-product-name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="production-date">Production Date</Label>
              <Input
                id="production-date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                data-testid="input-production-date"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity Produced</Label>
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
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="kg, pcs, etc."
                data-testid="input-unit"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raw Material Cost</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="raw-cost">Total Raw Material Cost</Label>
            <Input
              id="raw-cost"
              type="number"
              step="0.01"
              value={rawMaterialCost}
              onChange={(e) => setRawMaterialCost(e.target.value)}
              placeholder="0.00"
              data-testid="input-raw-cost"
              required
            />
          </div>

          <div className="p-4 bg-muted rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Production Rate per Unit:</span>
              <span className="text-lg font-mono font-semibold" data-testid="text-production-rate">
                ₹{productionRate}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Byproduct Information (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="byproduct-name">Byproduct Name</Label>
              <Input
                id="byproduct-name"
                value={byproductName}
                onChange={(e) => setByproductName(e.target.value)}
                placeholder="Enter byproduct name"
                data-testid="input-byproduct-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="byproduct-qty">Byproduct Quantity</Label>
              <Input
                id="byproduct-qty"
                type="number"
                step="0.01"
                value={byproductQty}
                onChange={(e) => setByproductQty(e.target.value)}
                placeholder="0"
                data-testid="input-byproduct-qty"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" data-testid="button-submit-production">
        Record Production
      </Button>
    </form>
  );
}
