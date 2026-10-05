import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { calculateStockoutRisk } from "@/lib/inventory";
import { AlertTriangle, Clock, Package } from "lucide-react";

export function StockoutRisk() {
  const risks = products.map(p => calculateStockoutRisk(p));
  const critical = risks.filter(r => r.risk === "CRITICAL");
  const high = risks.filter(r => r.risk === "HIGH");
  const medium = risks.filter(r => r.risk === "MEDIUM");
  const low = risks.filter(r => r.risk === "LOW");

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "CRITICAL": return "bg-red-600";
      case "HIGH": return "bg-orange-500";
      case "MEDIUM": return "bg-yellow-500";
      case "LOW": return "bg-emerald-600";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Stockout Risk Prediction</h1>
        <p className="text-slate-500 mt-1">Identify products at risk of running out of stock.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Critical Risk</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{critical.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">High Risk</p>
            <p className="text-2xl font-bold text-orange-500 mt-1">{high.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Medium Risk</p>
            <p className="text-2xl font-bold text-yellow-500 mt-1">{medium.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Low Risk</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{low.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stockout Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Store</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Current Stock</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Daily Demand</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Days of Inventory</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Lead Time</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Stockout Probability</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Risk</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{risk.product.name}</td>
                    <td className="py-3 px-4 text-slate-500">{risk.product.sku}</td>
                    <td className="py-3 px-4">{risk.product.store}</td>
                    <td className="py-3 px-4 text-right">{risk.product.currentStock}</td>
                    <td className="py-3 px-4 text-right">{risk.product.dailyDemand}</td>
                    <td className="py-3 px-4 text-right">{risk.daysOfInventory.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right">{risk.product.leadTime} days</td>
                    <td className="py-3 px-4 text-right font-medium">{risk.stockoutProbability}%</td>
                    <td className="py-3 px-4">
                      <Badge className={getRiskColor(risk.risk)}>{risk.risk}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}