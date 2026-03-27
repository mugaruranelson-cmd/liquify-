"use client";

import React from "react";
import { 
  ArrowLeft, 
  Wallet, 
  History, 
  MessageSquare, 
  Ban, 
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Plus
} from "lucide-react";
import { ScoreGauge, TierBadge, formatKES, displayPhone } from "@repo/ui";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a single customer
  const customer = {
    name: "Wanjiku Kamau",
    phone: "254712345678",
    score: 78,
    tier: "GOLD" as const,
    limit: 500000,
    balance: 250000,
    available: 250000,
    repaymentRate: 92,
    onTimeStreak: 14,
    points: 1250,
  };

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-900">{customer.name}</h1>
            <span className="text-sm text-slate-500 font-medium">{displayPhone(customer.phone)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <MessageSquare className="h-4 w-4" />
            Message
          </button>
          <button className="rounded-md bg-brand-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal-700 transition-colors">
            Issue Credit
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Score & Details */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Liquify Score</h3>
            <ScoreGauge score={customer.score} tier={customer.tier} size={200} />
            
            <div className="mt-8 grid grid-cols-2 gap-4 w-full border-t border-slate-100 pt-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500 font-medium uppercase">Rate</span>
                <span className="text-lg font-bold text-slate-900">{customer.repaymentRate}%</span>
              </div>
              <div className="flex flex-col items-center border-l border-slate-100">
                <span className="text-xs text-slate-500 font-medium uppercase">Streak</span>
                <span className="text-lg font-bold text-emerald-500">+{customer.onTimeStreak}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Loyalty Rewards</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Points Balance</span>
                <span className="text-xl font-bold text-brand-purple-700">{customer.points} pts</span>
              </div>
              <TrendingUp className="h-8 w-8 text-brand-purple-500 opacity-20" />
            </div>
            <button className="mt-4 w-full rounded-md bg-slate-50 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100">
              Redeem Points
            </button>
          </div>
        </div>

        {/* Right Column: Financials & History */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Credit Summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Credit Limit", value: customer.limit, icon: CreditCard },
              { label: "Outstanding", value: customer.balance, icon: Wallet, color: "text-rose-600" },
              { label: "Available", value: customer.available, icon: ShieldCheck, color: "text-brand-teal-500" },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <stat.icon className="h-4 w-4 text-slate-400 mb-3" />
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <h4 className={cn("text-lg font-bold mt-1", stat.color || "text-slate-900")}>
                  {formatKES(stat.value)}
                </h4>
              </div>
            ))}
          </div>

          {/* Activity Feed / History */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 leading-none">Transaction History</h3>
              <div className="flex gap-2">
                 <button className="flex items-center gap-1 text-xs font-bold text-brand-teal-500 hover:text-brand-teal-700 px-2 py-1 rounded bg-teal-50">
                  <Plus className="h-3 w-3" />
                  Manual Log
                 </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { date: "Oct 24, 2024", type: "Credit Issued", amount: 150000, status: "PENDING" },
                { date: "Oct 12, 2024", type: "Payment Received", amount: 200000, status: "COMPLETED" },
                { date: "Sep 28, 2024", type: "Credit Issued", amount: 300000, status: "COMPLETED" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{tx.type}</span>
                    <span className="text-xs text-slate-500">{tx.date}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-slate-900">{formatKES(tx.amount)}</span>
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded border mt-1",
                      tx.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    )}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-6 text-sm font-bold text-slate-400 hover:border-brand-teal-500/50 hover:text-brand-teal-500 transition-all">
             <Ban className="h-4 w-4" />
             Blacklist Customer
          </button>
        </div>
      </div>
    </div>
  );
}
