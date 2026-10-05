import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { calculateReorderQuantity } from "@/lib/inventory";
import { toast } from "sonner";
import { RefreshCcw, Check, X, Pencil } from "lucide-react";

export function ReorderRecommendations() {
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const recommendations = products
    .filter(p => p.currentStock < p.reorderPoint * 1.5)
    .map(p => calculateReorderQuantity(p));

  const handleApprove = (id: string) => {
    setApproved([...approved, id]);
    toast.success("Purchase order created successfully");
  };

  const handleReject = (id: string) => {
    setRejected([...rejected, id]);
    toast.info("Recommendation rejected");
  };

  const handleEdit = () => {
    toast.info("Edit quantity feature coming soon");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Smart Reorder Recommendations</h1>
        <p className="text-slate-500 mt-1">AI-powered reorder suggestions based on demand forecasting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Products to Reorder</p>
            <p className="text-2xl font-bold mt-1">{recommendations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Approved</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{approved.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Rejected</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{rejected.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.product.id} className={approved.includes(rec.product.id) ? "border-emerald-300 bg-emerald-50/50" : rejected.includes(rec.product.id) ? "border-red-300 bg-red-50/50" : ""}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{rec.product.name}</h3>
                    <Badge variant="secondary">{rec.product.sku}</Badge>
                    <Badge className="bg-emerald-600">{rec.product.store}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-slate-500">Current Stock</p>
                      <p className="font-medium">{rec.product.currentStock} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Forecast Demand</p>
                      <p className="font-medium">{rec.forecastDemand} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Reorder Point</p>
                      <p className="font-medium">{rec.reorderPoint} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Recommended Order</p>
                      <p className="font-medium text-emerald-600">{rec.recommendedOrderQuantity} units</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">{rec.explanation}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleApprove(rec.product.id)}
                    disabled={approved.includes(rec.product.id) || rejected.includes(rec.product.id)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" onClick={handleEdit}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Quantity
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleReject(rec.product.id)}
                    disabled={approved.includes(rec.product.id) || rejected.includes(rec.product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}