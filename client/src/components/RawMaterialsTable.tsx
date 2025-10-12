import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Material {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  reorderPoint: number;
}

interface RawMaterialsTableProps {
  materials: Material[];
}

export default function RawMaterialsTable({ materials }: RawMaterialsTableProps) {
  const isLowStock = (stock: number, reorder: number) => stock <= reorder;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raw Materials Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material Name</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reorder Point</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id} data-testid={`row-material-${material.id}`}>
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell className="text-muted-foreground">{material.unit}</TableCell>
                <TableCell className="font-mono">{material.currentStock}</TableCell>
                <TableCell className="font-mono">{material.reorderPoint}</TableCell>
                <TableCell>
                  {isLowStock(material.currentStock, material.reorderPoint) ? (
                    <Badge variant="destructive" className="gap-1" data-testid={`status-low-${material.id}`}>
                      <AlertTriangle className="h-3 w-3" />
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-chart-2" data-testid={`status-ok-${material.id}`}>
                      In Stock
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
