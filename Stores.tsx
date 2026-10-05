import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stores, products } from "@/lib/data";
import { IndianRupee, Package, AlertTriangle, Store as StoreIcon } from "lucide-react";

export function Stores() {
  const transferRecommendations = [
    {
      from: "Adyar",
      to: "Anna Nagar",
      product: "Milk 1L",
      quantity: 50,
      reason: "Anna Nagar has 15 units left, Adyar has 150 units",
    },
    {
      from: "Velachery",
      to: "T. Nagar",
      product: "Bread 400g",
      quantity: 30,
      reason: "T. Nagar demand is 20% higher than forecast",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Multi-Store Inventory</h1>
        <p className="text-slate-500 mt-1">Monitor inventory across all store locations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StoreIcon className="w-5 h-5 text-emerald-600" />
                {store.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Inventory Value</span>
                <span className="font-medium">₹{store.inventoryValue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">SKU Count</span>
                <span className="font-medium">{store.skuCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Low Stock</span>
                <Badge className="bg-yellow-500">{store.lowStock}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Stockout Risk</span>
                <Badge className="bg-red-600">{store.stockoutRisk}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Overstock</span>
                <Badge className="bg-orange-500">{store.overstock}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Today's Sales</span>
                <span className="font-medium text-emerald-600">₹{store.todaySales.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Transfer Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transferRecommendations.map((rec, i) => (
            <div key={i} className="p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{rec.product}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Transfer {rec.quantity} units from {rec.from} to {rec.to}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{rec.reason}</p>
                </div>
                <Badge className="bg-emerald-600">Recommended</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}