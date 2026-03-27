import React from "react";
import { Users, Store, CreditCard, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { getPlatformMetrics, getMonthlyVolume, getRiskDistribution } from "../../lib/analytics";
import { VolumeChart, RiskPieChart } from "./charts";
import { formatKES } from "@repo/ui";

export default async function AdminDashboardPage() {
  const metrics = await getPlatformMetrics();
  const volumeData = await getMonthlyVolume();
  const riskData = await getRiskDistribution();

  const stats = [
    { name: "Total Volume", value: formatKES(metrics.totalVolume), icon: CreditCard, change: "+12.5%", trend: "up" },
    { name: "Active Merchants", value: metrics.merchants.toString(), icon: Store, change: "+3", trend: "up" },
    { name: "Total Customers", value: metrics.customers.toString(), icon: Users, change: "+18", trend: "up" },
    { name: "Platform Health", value: "98.2%", icon: Activity, change: "-0.5%", trend: "down" },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-500">Real-time performance metrics and credit risk monitoring.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">
                <stat.icon className="h-5 w-5 text-slate-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" /> }
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.name}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* volume Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Transaction Volume (KES)</h2>
            <div className="text-xs font-bold text-brand-teal-600 bg-brand-teal-50 px-2 py-1 rounded">Last 6 Months</div>
          </div>
          <VolumeChart data={volumeData.length > 0 ? volumeData : [
            { name: 'Jan', value: 4000 },
            { name: 'Feb', value: 3000 },
            { name: 'Mar', value: 5000 },
            { name: 'Apr', value: 2780 },
            { name: 'May', value: 1890 },
            { name: 'Jun', value: 2390 },
          ]} />
        </div>

        {/* Risk Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Credit Risk distribution</h2>
            <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">By Tier</div>
          </div>
          <RiskPieChart data={riskData.some(d => d.value > 0) ? riskData : [
             { name: 'PLATINUM', value: 15 },
             { name: 'GOLD', value: 35 },
             { name: 'SILVER', value: 40 },
             { name: 'BRONZE', value: 10 },
          ]} />
        </div>
      </div>
    </div>
  );
}
