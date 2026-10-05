import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IndianRupee,
  Package,
  TrendingUp,
  AlertTriangle,
  PackageX,
  Clock,
  Activity,
  ArrowRight,
  Bot,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { products, stores } from "@/lib/data";
import { calculateStockoutRisk, predictDemand } from "@/lib/inventory";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.currentStock, 0);
  const totalSKUs = products.length;
  const todaySales = stores.reduce((sum, s) => sum + s.todaySales, 0);
  const stockoutRisks = products.map(p => calculateStockoutRisk(p));
  const criticalRisks = stockoutRisks.filter(r => r.risk === "CRITICAL" || r.risk === "HIGH");
  const overstockProducts = products.filter(p => p.currentStock > p.reorderPoint * 2);
  const slowMoving = products.filter(p => p.dailyDemand < 5 && p.currentStock > 50);
  const healthScore = Math.max(0, 100 - criticalRisks.length * 5 - overstockProducts.length * 2 - slowMoving.length * 3);

  const salesTrend = [
    { day: "Mon", sales: 145000 },
    { day: "Tue", sales: 152000 },
    { day: "Wed", sales: 148000 },
    { day: "Thu", sales: 165000 },
    { day: "Fri", sales: 178000 },
    { day: "Sat", sales: 195000 },
    { day: "Sun", sales: 188000 },
  ];

  const demandData = [
    { day: "Day 1", actual: 95, predicted: 98 },
    { day: "Day 2", actual: 102, predicted: 105 },
    { day: "Day 3", actual: 98, predicted: 100 },
    { day: "Day 4", actual: 110, predicted: 112 },
    { day: "Day 5", actual: 105, predicted: 108 },
    { day: "Day 6", actual: 118, predicted: 115 },
    { day: "Day 7", actual: 112, predicted: 118 },
  ];

  const healthData = [
    { name: "Healthy", value: 70 },
    { name: "At Risk", value: 20 },
    { name: "Critical", value: 10 },
  ];

  const topProducts = [
    { name: "Milk 1L", sales: 115 },
    { name: "Bread 400g", sales: 95 },
    { name: "Eggs 12-pack", sales: 80 },
    { name: "Curd 400g", sales: 70 },
    { name: "Water 1L", sales: 60 },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  const alerts = [
    { product: "Milk 1L", store: "Anna Nagar", risk: "CRITICAL", time: "10 hours" },
    { product: "Bread 400g", store: "Anna Nagar", risk: "HIGH", time: "14 hours" },
    { product: "Eggs 12-pack", store: "Anna Nagar", risk: "HIGH", time: "18 hours" },
  ];

  const recommendations = [
    { text: "Milk 1L at Anna Nagar may stock out within 10 hours. Recommended order: 250 units.", action: "View" },
    { text: "Bread 400g demand increasing 15% this weekend. Increase order by 20%.", action: "View" },
    { text: "Premium Biscuits overstocked by 600 units. Consider promotion or transfer.", action: "View" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's your inventory overview.</p>
        </div>
        <Button onClick={() => onNavigate("assistant")} className="bg-emerald-600 hover:bg-emerald-700">
          <Bot className="w-4 h-4 mr-2" />
          Ask AI Assistant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Inventory Value</p>
                <p className="text-2xl font-bold mt-1">₹{totalInventoryValue.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total SKUs</p>
                <p className="text-2xl font-bold mt-1">{totalSKUs}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Today's Sales</p>
                <p className="text-2xl font-bold mt-1">₹{todaySales.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Stockout Risk</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{criticalRisks.length} products</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-emerald-600">{healthScore}%</p>
              <p className="text-sm text-slate-500 mt-1">Overall Health Score</p>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={healthData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                    {healthData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Historical vs Predicted Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{alert.product}</p>
                  <p className="text-sm text-slate-500">{alert.store} · Stockout in {alert.time}</p>
                </div>
                <Badge className="bg-red-600">{alert.risk}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => onNavigate("alerts")}>
              View All Alerts <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, i) => (
              <div key={i} className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm text-slate-700">{rec.text}</p>
                <Button variant="link" className="text-emerald-600 p-0 h-auto mt-2" onClick={() => onNavigate("reorder")}>
                  {rec.action} <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}