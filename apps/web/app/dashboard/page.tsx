import React from "react";
import { 
  Users, 
  Wallet, 
  Clock, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import { formatKES } from "@repo/ui";

const stats = [
  { label: "Total outstanding", value: 450000, trend: "+12%", type: "neutral", icon: Wallet },
  { label: "Collected today", value: 125000, trend: "+5%", type: "success", icon: CheckCircle2 },
  { label: "Overdue accounts", value: 8, trend: "-2", type: "danger", icon: Clock },
  { label: "At-risk customers", value: 3, trend: "+1", type: "warning", icon: AlertTriangle },
];

const dueThisWeek = [
  { name: "Wanjiku Kamau", phone: "0712 345 678", amount: 250000, days: 2 },
  { name: "John Musyoka", phone: "0722 987 654", amount: 120000, days: 4 },
  { name: "Mary Atieno", phone: "0733 111 222", amount: 55000, days: 5 },
];

const recentActivity = [
  { type: "payment", customer: "David Omndi", amount: 150000, time: "2 hours ago" },
  { type: "credit", customer: "Sarah Kimani", amount: 300000, time: "4 hours ago" },
  { type: "overdue", customer: "James Mwangi", amount: 85000, time: "6 hours ago" },
];

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-10 p-6 lg:p-12 max-w-6xl mx-auto min-h-screen text-slate-600">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 font-medium">Monitoring manual collections for <span className="text-slate-900 font-semibold">Kamau Shop</span></p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/how-it-works" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
            How it works
          </Link>
          <Link href="/pricing" className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
            Pricing
          </Link>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-help">
              <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </span>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="premium-card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${
                s.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 
                s.type === 'danger' ? 'bg-rose-50 text-rose-600' : 
                s.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
              }`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-bold ${
                s.type === 'success' ? 'text-emerald-600' : 
                s.type === 'danger' ? 'text-rose-600' : 
                s.type === 'warning' ? 'text-amber-600' : 'text-slate-400'
              }`}>
                {s.trend}
              </span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500 mb-1">{s.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {typeof s.value === 'number' && (s.label.includes('KES') || s.label.includes('outstanding') || s.label.includes('Collected'))
                  ? formatKES(s.value) 
                  : s.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Collections and Activity */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Due Collections (Takes 2 columns) */}
        <div className="lg:col-span-2 premium-card overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Upcoming Collections</h3>
            <Link href="/dashboard/repayments" className="text-xs font-bold text-blue-600 hover:underline">View All Schedule</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {dueThisWeek.map((item, i) => (
              <div key={i} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-default">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500">
                    {item.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="text-xs text-slate-500 font-medium">{item.phone}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-bold text-slate-900">{formatKES(item.amount)}</span>
                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    item.days <= 2 ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    Due in {item.days} days
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Ledger (Takes 1 column) */}
        <div className="premium-card overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100">
             <h3 className="font-bold text-slate-900">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`mt-0.5 flex h-8 w-8 min-w-[32px] items-center justify-center rounded-lg border ${
                  activity.type === 'payment' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  activity.type === 'credit' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                  {activity.type === 'payment' ? <CheckCircle2 className="h-4 w-4" /> :
                   activity.type === 'credit' ? <TrendingUp className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                </div>
                <div className="flex flex-col">
                  <p className="text-[13px] font-bold text-slate-800 leading-snug">
                    {activity.type === 'payment' ? `${activity.customer} paid` :
                     activity.type === 'credit' ? `Credit to ${activity.customer}` : `Overdue: ${activity.customer}`}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium text-slate-400">{activity.time}</span>
                    <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                    <span className="text-[11px] font-bold text-slate-600">{formatKES(activity.amount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/dashboard/credit" className="bg-slate-900 p-6 rounded-2xl flex items-center justify-between group hover:bg-slate-800 transition-all text-white">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg">Issue Credit</span>
            <span className="text-xs font-medium text-slate-400">Add new manual credit entry</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl group-hover:bg-white/20 transition-all">
            <Plus className="h-6 w-6" />
          </div>
        </Link>
        <Link href="/dashboard/repayments" className="premium-card p-6 flex items-center justify-between group">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg text-slate-900">Record Payment</span>
            <span className="text-xs font-medium text-slate-500">Collect cash repayment</span>
          </div>
          <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-slate-200 transition-all">
            <Wallet className="h-6 w-6 text-slate-600" />
          </div>
        </Link>
        <Link href="/dashboard/customers" className="premium-card p-6 flex items-center justify-between group">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg text-slate-900">Add Customer</span>
            <span className="text-xs font-medium text-slate-500">Register new shop client</span>
          </div>
          <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-slate-200 transition-all">
            <Users className="h-6 w-6 text-slate-600" />
          </div>
        </Link>
      </div>
    </div>
  );
}
