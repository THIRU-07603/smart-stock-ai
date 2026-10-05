import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { calculateReorderQuantity } from "@/lib/inventory";
import { toast } from "sonner";
import { FileText, Plus, Check, Clock, Package, Truck, X } from "lucide-react";

interface PurchaseOrder {
  id: string;
  product: string;
  sku: string;
  quantity: number;
  supplier: string;
  status: "Draft" | "Pending" | "Approved" | "Ordered" | "Received";
  date: string;
}

export function PurchaseOrders() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const recommendations = products
    .filter(p => p.currentStock < p.reorderPoint * 1.5)
    .map(p => calculateReorderQuantity(p));

  const createOrder = (rec: typeof recommendations[0]) => {
    const newOrder: PurchaseOrder = {
      id: `PO-${Date.now()}`,
      product: rec.product.name,
      sku: rec.product.sku,
      quantity: rec.recommendedOrderQuantity,
      supplier: rec.product.supplier,
      status: "Draft",
      date: new Date().toLocaleDateString(),
    };
    setOrders([newOrder, ...orders]);
    toast.success("Purchase order created");
  };

  const updateStatus = (id: string, status: PurchaseOrder["status"]) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${status.toLowerCase()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft": return "bg-slate-500";
      case "Pending": return "bg-yellow-500";
      case "Approved": return "bg-blue-500";
      case "Ordered": return "bg-orange-500";
      case "Received": return "bg-emerald-600";
      default: return "bg-slate-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Draft": return <FileText className="w-3 h-3" />;
      case "Pending": return <Clock className="w-3 h-3" />;
      case "Approved": return <Check className="w-3 h-3" />;
      case "Ordered": return <Package className="w-3 h-3" />;
      case "Received": return <Truck className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Purchase Orders</h1>
        <p className="text-slate-500 mt-1">Manage your purchase orders and supplier communications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {(["Draft", "Pending", "Approved", "Ordered", "Received"] as const).map(status => (
          <Card key={status}>
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">{status}</p>
              <p className="text-2xl font-bold mt-1">{orders.filter(o => o.status === status).length}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Purchase Order from Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.slice(0, 5).map((rec) => (
              <div key={rec.product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">{rec.product.name}</p>
                  <p className="text-sm text-slate-500">
                    {rec.product.sku} · {rec.recommendedOrderQuantity} units · {rec.product.supplier}
                  </p>
                </div>
                <Button onClick={() => createOrder(rec)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create PO
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No purchase orders yet. Create one from the recommendations above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">SKU</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4 text-slate-500">{order.sku}</td>
                      <td className="py-3 px-4 text-right">{order.quantity}</td>
                      <td className="py-3 px-4">{order.supplier}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {order.status === "Draft" && (
                            <Button variant="outline" size="sm" onClick={() => updateStatus(order.id, "Pending")}>
                              Submit
                            </Button>
                          )}
                          {order.status === "Pending" && (
                            <Button variant="outline" size="sm" onClick={() => updateStatus(order.id, "Approved")}>
                              Approve
                            </Button>
                          )}
                          {order.status === "Approved" && (
                            <Button variant="outline" size="sm" onClick={() => updateStatus(order.id, "Ordered")}>
                              Place Order
                            </Button>
                          )}
                          {order.status === "Ordered" && (
                            <Button variant="outline" size="sm" onClick={() => updateStatus(order.id, "Received")}>
                              Mark Received
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-red-600">
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}