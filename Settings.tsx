import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Bell, Shield, Database, Save } from "lucide-react";

export function Settings() {
  const [settings, setSettings] = useState({
    storeName: "SmartStock AI",
    email: "admin@smartstock.ai",
    lowStockThreshold: 20,
    criticalStockThreshold: 10,
    emailAlerts: true,
    pushAlerts: true,
    autoReorder: false,
    forecastModel: "moving-average",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your SmartStock AI preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Store Name</Label>
              <Input
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Low Stock Threshold (%)</Label>
                <Input
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) => setSettings({ ...settings, lowStockThreshold: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Critical Stock Threshold (%)</Label>
                <Input
                  type="number"
                  value={settings.criticalStockThreshold}
                  onChange={(e) => setSettings({ ...settings, criticalStockThreshold: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-sm text-slate-500">Receive alerts via email</p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, emailAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-slate-500">Receive push notifications</p>
              </div>
              <Switch
                checked={settings.pushAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, pushAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Reorder</p>
                <p className="text-sm text-slate-500">Automatically create purchase orders</p>
              </div>
              <Switch
                checked={settings.autoReorder}
                onCheckedChange={(checked) => setSettings({ ...settings, autoReorder: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              AI Model Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Forecast Model</Label>
              <select
                value={settings.forecastModel}
                onChange={(e) => setSettings({ ...settings, forecastModel: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-white"
              >
                <option value="moving-average">Moving Average</option>
                <option value="exponential">Exponential Smoothing</option>
                <option value="ml">Machine Learning (Coming Soon)</option>
              </select>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700">
                Current model: 7-day moving average with day-of-week and seasonality adjustments.
                ML model integration coming soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}