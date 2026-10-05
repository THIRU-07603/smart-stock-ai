import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { detectSlowMoving, detectOverstock } from "@/lib/inventory";
import { Clock, PackageX } from "lucide-react";

export function SlowMovingOverstock() {
  const slowMoving = detectSlowMoving(products);
  const overstock = detectOverstock(products);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Slow-Moving & Overstock Detection</h1>
        <p className="text-slate-500 mt-1">Identify products that need attention.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Slow-Moving Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Product</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Stock</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Daily Sales</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Days of Inventory</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Value</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {slowMoving.map((item) => (
                    <tr key={item.product.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">{item.product.name}</td>
                      <td className="py-3 px-4 text-right">{item.product.currentStock}</td>
                      <td className="py-3 px-4 text-right">{item.product.dailyDemand}</td>
                      <td className="py-3 px-4 text-right">{item.daysOfInventory.toFixed(1)}</td>
                      <td className="py-3 px-4 text-right">₹{item.inventoryValue.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-orange-500">{item.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageX className="w-5 h-5 text-red-500" />
              Overstock Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Product</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Current Stock</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Expected Demand</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Excess</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Money Locked</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {overstock.map((item) => (
                    <tr key={item.product.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">{item.product.name}</td>
                      <td className="py-3 px-4 text-right">{item.product.currentStock}</td>
                      <td className="py-3 px-4 text-right">{item.expectedDemand}</td>
                      <td className="py-3 px-4 text-right text-red-600 font-medium">{item.excessQuantity}</td>
                      <td className="py-3 px-4 text-right">₹{item.moneyLocked.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-500">{item.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}