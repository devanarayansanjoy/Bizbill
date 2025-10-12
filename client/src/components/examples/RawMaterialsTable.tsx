import RawMaterialsTable from '../RawMaterialsTable';

export default function RawMaterialsTableExample() {
  const mockMaterials = [
    { id: "1", name: "Cotton Fabric", unit: "meters", currentStock: 150, reorderPoint: 100 },
    { id: "2", name: "Thread Spools", unit: "pcs", currentStock: 45, reorderPoint: 50 },
    { id: "3", name: "Buttons", unit: "pcs", currentStock: 200, reorderPoint: 150 },
    { id: "4", name: "Zipper", unit: "pcs", currentStock: 30, reorderPoint: 40 },
  ];

  return <RawMaterialsTable materials={mockMaterials} />;
}
