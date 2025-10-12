import ByproductSalesForm from "@/components/ByproductSalesForm";

export default function ByproductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Byproduct Sales</h1>
        <p className="text-muted-foreground">Generate invoices for byproduct sales</p>
      </div>
      <ByproductSalesForm />
    </div>
  );
}
