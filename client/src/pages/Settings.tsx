import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Save } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("bizbillpro_shop_name");
    if (savedName) {
      setShopName(savedName);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("bizbillpro_shop_name", shopName.trim());
    toast({
      title: "Settings Saved",
      description: "Your shop name has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shop-name">Shop Name</Label>
            <Input
              id="shop-name"
              placeholder="e.g. Acme Supermarket"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This name will be printed on all your invoices and used in automated WhatsApp messages.
            </p>
          </div>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
