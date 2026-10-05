import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { products, historicalSales } from "@/lib/data";
import { predictDemand } from "@/lib/inventory";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar, Activity } from "lucide-react";

export function DemandForecast() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedStore, setSelectedStore] = useState("Anna Nagar");
  const [forecastPeriod, setForecastPeriod] = useState("7");

  const prediction = predictDemand(selectedProduct, parseInt(forecastPeriod));

  const chartData = prediction.historical.slice(-14).map((value, i) => ({
    day: `D${i + 1}`,
    actual: value,
    predicted: prediction.predicted[i] || null,
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AI Demand Prediction</h1>
        <p className="text-slate-500 mt-1">Predict future demand based on historical patterns and trends.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Product</Label>
              <Select value={selectedProduct.id} onValueChange={(v) => setSelectedProduct(products.find(p => p.id === v) || products[0])}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>SKU</Label>
              <Input value={selectedProduct.sku} disabled className="mt-1" />
            </div>
            <div>
              <Label>Store</Label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anna Nagar">Anna Nagar</SelectItem>
                  <SelectItem value="Adyar">Adyar</SelectItem>
                  <SelectItem value="Velachery">Velachery</SelectItem>
                  <SelectItem value="T. Nagar">T. Nagar</SelectItem>
                  <SelectItem value="Chennai Central">Chennai Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Forecast Period</Label>
              <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Average Daily Demand</p>
                <p className="text-xl font-bold">{prediction.averageDailyDemand} units</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Predicted Tomorrow</p>
                <p className="text-xl font-bold">{prediction.predictedTomorrow} units</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Next {forecastPeriod} Days</p>
                <p className="text-xl font-bold">{prediction.predictedNext7Days} units</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Forecast Confidence</p>
                <p className="text-xl font-bold">{prediction.confidence}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demand Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forecast Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium">Demand Trend</p>
              <p className="text-sm text-slate-500">Based on 7-day moving average and day-of-week patterns</p>
            </div>
            <Badge className={prediction.trend === "increasing" ? "bg-emerald-600" : prediction.trend === "decreasing" ? "bg-red-600" : "bg-slate-600"}>
              {prediction.trend.charAt(0).toUpperCase() + prediction.trend.slice(1)}
            </Badge>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <p className="text-sm text-slate-700">
              {selectedProduct.name} is expected to see a {prediction.trend === "increasing" ? "increase" : "decrease"} in demand over the next {forecastPeriod} days. 
              {prediction.trend === "increasing" ? " Consider increasing your order quantity to avoid stockouts." : " Consider reducing your order quantity to avoid overstock."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}