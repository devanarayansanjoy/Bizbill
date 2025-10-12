import RawMaterialsTable from "@/components/RawMaterialsTable";

export default function RawMaterials() {
  const mockMaterials = [
    { id: "1", name: "Cotton Fabric", unit: "meters", currentStock: 150, reorderPoint: 100 },
    { id: "2", name: "Thread Spools", unit: "pcs", currentStock: 45, reorderPoint: 50 },
    { id: "3", name: "Buttons", unit: "pcs", currentStock: 200, reorderPoint: 150 },
    { id: "4", name: "Zipper", unit: "pcs", currentStock: 30, reorderPoint: 40 },
    { id: "5", name: "Dye Powder", unit: "kg", currentStock: 80, reorderPoint: 60 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Raw Materials</h1>
        <p className="text-muted-foreground">Monitor inventory levels and stock alerts</p>
      </div>
      <RawMaterialsTable materials={mockMaterials} />
    </div>
  );
}
