"use client";

import React, { useState } from "react";
import { 
  Wallet, 
  History, 
  Smartphone, 
  ChevronRight, 
  CheckCircle2, 
  Clock,
  LogOut,
  Bell,
  CreditCard
} from "lucide-react";
import { ScoreGauge, formatKES } from "@repo/ui";

export default function CustomerMePage() {
  const [isPaying, setIsPaying] = useState(false);
  
  const customer = {
    name: "Wanjiku Kamau",
    shop: "Kamau Supermarket",
    score: 78,
    tier: "GOLD" as const,
    balance: 250000,
    limit: 500000,
    dueDate: "Oct 30, 2024",
    daysLeft: 5,
  };

  if (isPaying) {
     return (
       <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
         <div className="relative mb-8">
            <div className="h-24 w-24 rounded-full border-4 border-brand-teal-500 border-t-transparent animate-spin" />
            <Smartphone className="absolute inset-0 m-auto h-10 w-10 text-brand-teal-500" />
         </div>
         <h2 className="text-2xl font-bold text-slate-900">Requesting M-Pesa...</h2>
         <p className="text-slate-500 mt-2">Please check your phone and enter your M-Pesa PIN to pay {formatKES(customer.balance)}.</p>
         <button 
           onClick={() => setIsPaying(false)}
           className="mt-12 text-sm font-bold text-slate-400 underline"
         >
           Cancel Request
         </button>
       </div>
     );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-teal-500 flex items-center justify-center text-white font-bold">L</div>
          <span className="font-bold text-slate-900">Liquify</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-400 hover:text-brand-teal-500 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 border-2 border-white" />
          </button>
          <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8 max-w-md mx-auto">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bole, {customer.name}!</h1>
          <p className="text-sm text-slate-500">Your credit status at {customer.shop}</p>
        </div>

        {/* Balance Card */}
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Balance Due</p>
              <h2 className="text-4xl font-extrabold mt-1 tracking-tight">{formatKES(customer.balance)}</h2>
              
              <div className="mt-8 flex items-center gap-4">
                 <div className="flex-1 rounded-2xl bg-white/10 p-4 border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Due Date</p>
                    <p className="font-bold">{customer.dueDate}</p>
                 </div>
                 <div className="flex-1 rounded-2xl bg-white/10 p-4 border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Status</p>
                    <p className="font-bold text-emerald-400">Active</p>
                 </div>
              </div>
           </div>
           {/* Decorative circles */}
           <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-teal-500 opacity-20 blur-3xl" />
           <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-brand-purple-500 opacity-20 blur-3xl" />
        </div>

        {/* Liquify Score Gauge */}
        <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">Your Liquify Score</h3>
           <ScoreGauge score={customer.score} tier={customer.tier} size={220} />
           <p className="text-center text-xs text-slate-500 mt-2 px-4 italic leading-relaxed">
             You are in the <span className="text-brand-teal-600 font-bold">top 15%</span> of customers. Maintain this to unlock up to {formatKES(1000000)} limit!
           </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4">
           <button 
             onClick={() => setIsPaying(true)}
             className="w-full flex items-center justify-center gap-3 rounded-2xl bg-brand-teal-500 py-5 font-bold text-white transition-all hover:bg-brand-teal-700 shadow-lg shadow-brand-teal-500/20"
           >
             <Smartphone className="h-5 w-5" />
             Pay with M-Pesa
           </button>
           <button className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white border border-slate-200 py-5 font-bold text-slate-900 transition-all hover:bg-slate-50">
             <CreditCard className="h-5 w-5 text-brand-purple-500" />
             View Credit Details
           </button>
        </div>

        {/* Recent History */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <History className="h-4 w-4 text-slate-400" />
              Recent Activity
            </h3>
            <button className="text-xs font-bold text-brand-teal-500 uppercase tracking-widest">See All</button>
          </div>
          <div className="space-y-3">
             {[
               { type: 'Payment', amount: 50000, date: 'Yesterday', icon: CheckCircle2, bg: 'bg-emerald-50', text: 'text-emerald-500' },
               { type: 'Credit', amount: 30000, date: 'Oct 20', icon: ArrowUpRight, bg: 'bg-blue-50', text: 'text-blue-500' },
             ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${tx.bg} flex items-center justify-center ${tx.text}`}>
                      <tx.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{tx.type}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">{formatKES(tx.amount)}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 px-8 flex items-center justify-around z-50">
         <button className="flex flex-col items-center gap-1 text-brand-teal-500">
           <Wallet className="h-6 w-6" />
           <span className="text-[10px] font-bold uppercase">Home</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-slate-500">
           <History className="h-6 w-6" />
           <span className="text-[10px] font-bold uppercase">History</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-slate-500">
           < Bell className="h-6 w-6" />
           <span className="text-[10px] font-bold uppercase">Alerts</span>
         </button>
      </nav>
    </main>
  );
}
