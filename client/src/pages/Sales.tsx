import SalesForm from "@/components/SalesForm";

export default function Sales() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Sales Entry</h1>
        <p className="text-muted-foreground">Create new sales invoices</p>
      </div>
      <SalesForm />
    </div>
  );
}
