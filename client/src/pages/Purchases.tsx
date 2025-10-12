import PurchaseForm from "@/components/PurchaseForm";

export default function Purchases() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Purchase Entry</h1>
        <p className="text-muted-foreground">Record purchase bills and payments</p>
      </div>
      <PurchaseForm />
    </div>
  );
}
