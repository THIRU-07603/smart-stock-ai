import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { calculateStockoutRisk, detectSlowMoving, detectOverstock } from "@/lib/inventory";
import { toast } from "sonner";
import { Bell, Check, X, AlertTriangle, Clock, PackageX, TrendingUp, RefreshCcw, ArrowLeftRight } from "lucide-react";

interface Alert {
  id: string;
  type: string;
  message: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  read: boolean;
  dismissed: boolean;
}

export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const risks = products.map(p => calculateStockoutRisk(p));
    const critical = risks.filter(r => r.risk === "CRITICAL" || r.risk === "HIGH");
    const slowMoving = detectSlowMoving(products);
    const overstock = detectOverstock(products);

    const alertList: Alert[] = [
      ...critical.map((r, i) => ({
        id: `stockout-${i}`,
        type: "Stockout Risk",
        message: `${r.product.name} at ${r.product.store} has ${r.stockoutProbability}% stockout risk. Expected stockout in ${r.expectedStockoutTime}.`,
        severity: r.risk as "CRITICAL" | "HIGH",
        read: false,
        dismissed: false,
      })),
      ...slowMoving.map((s, i) => ({
        id: `slow-${i}`,
        type: "Slow Moving",
        message: `${s.product.name} is slow-moving with ${s.daysOfInventory.toFixed(1)} days of inventory.`,
        severity: "MEDIUM" as const,
        read: false,
        dismissed: false,
      })),
      ...overstock.map((o, i) => ({
        id: `overstock-${i}`,
        type: "Overstock",
        message: `${o.product.name} has ${o.excessQuantity} units excess, locking ₹${o.moneyLocked.toLocaleString()}.`,
        severity: "MEDIUM" as const,
        read: false,
        dismissed: false,
      })),
      {
        id: "demand-spike",
        type: "Demand Spike",
        message: "Milk 1L demand is expected to increase 20% this weekend due to festival season.",
        severity: "HIGH" as const,
        read: false,
        dismissed: false,
      },
      {
        id: "reorder",
        type: "Reorder Required",
        message: "5 products have reached their reorder point. Review recommendations.",
        severity: "HIGH" as const,
        read: false,
        dismissed: false,
      },
      {
        id: "transfer",
        type: "Stock Transfer",
        message: "Recommended: Transfer 50 units of Milk 1L from Adyar to Anna Nagar.",
        severity: "MEDIUM" as const,
        read: false,
        dismissed: false,
      },
    ];
    return alertList;
  });

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
    toast.success("Alert marked as read");
  };

  const dismiss = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, dismissed: true } : a));
    toast.info("Alert dismissed");
  };

  const visibleAlerts = alerts.filter(a => !a.dismissed);
  const unreadCount = visibleAlerts.filter(a => !a.read).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-red-600";
      case "HIGH": return "bg-orange-500";
      case "MEDIUM": return "bg-yellow-500";
      default: return "bg-emerald-600";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Stockout Risk": return <AlertTriangle className="w-4 h-4" />;
      case "Slow Moving": return <Clock className="w-4 h-4" />;
      case "Overstock": return <PackageX className="w-4 h-4" />;
      case "Demand Spike": return <TrendingUp className="w-4 h-4" />;
      case "Reorder Required": return <RefreshCcw className="w-4 h-4" />;
      case "Stock Transfer": return <ArrowLeftRight className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Alert Center</h1>
          <p className="text-slate-500 mt-1">Monitor and manage all inventory alerts.</p>
        </div>
        <Badge className="bg-emerald-600">{unreadCount} Unread</Badge>
      </div>

      <div className="space-y-4">
        {visibleAlerts.map((alert) => (
          <Card key={alert.id} className={alert.read ? "opacity-75" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${getSeverityColor(alert.severity)}`}>
                    {getIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{alert.type}</h3>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                      {!alert.read && <Badge variant="secondary">New</Badge>}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(alert.id)}
                    disabled={alert.read}
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dismiss(alert.id)}
                    className="text-red-600"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Dismiss
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