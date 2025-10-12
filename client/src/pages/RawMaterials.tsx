import { useQuery } from "@tanstack/react-query";
import RawMaterialsTable from "@/components/RawMaterialsTable";

interface RawMaterial {
  id: string;
  name: string;
  unit: string;
  currentStock: string;
  reorderPoint: string | null;
}

export default function RawMaterials() {
  const { data: materials = [] } = useQuery<RawMaterial[]>({
    queryKey: ["/api/materials"],
  });

  const formattedMaterials = materials.map(m => ({
    id: m.id,
    name: m.name,
    unit: m.unit,
    currentStock: parseFloat(m.currentStock),
    reorderPoint: m.reorderPoint ? parseFloat(m.reorderPoint) : 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Raw Materials</h1>
        <p className="text-muted-foreground">Monitor inventory levels and stock alerts</p>
      </div>
      {formattedMaterials.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No materials in inventory yet. Add materials to start tracking stock.</p>
      ) : (
        <RawMaterialsTable materials={formattedMaterials} />
      )}
    </div>
  );
}
