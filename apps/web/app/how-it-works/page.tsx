"use client";

import Link from "next/link";
import { 
  UserPlus, 
  CreditCard, 
  Wallet, 
  LineChart, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck,
  Zap,
  ChevronRight
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Register & Onboard",
      description: "Quickly register your shop and add your trusted customers. No complex paperwork required for the pilot phase.",
      color: "blue"
    },
    {
      icon: CreditCard,
      title: "Issue Instant Credit",
      description: "Provide small, short-term credit to your customers for essential stock. Record everything manually in seconds.",
      color: "emerald"
    },
    {
      icon: Wallet,
      title: "Collect Repayments",
      description: "Track cash or mobile money repayments. The system automatically updates balances and sends reminders.",
      color: "indigo"
    },
    {
      icon: LineChart,
      title: "Build Your Profile",
      description: "Every manual entry builds a digital credit score for your shop, unlocking access to larger supplier loans.",
      color: "amber"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-600 font-sans">
      {/* Navigation Breadcrumb/Back */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors group">
          <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
          <Zap className="h-3 w-3" />
          The Liquify Process
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight max-w-3xl mb-8 leading-[1.1]">
          Credit Intelligence for <span className="text-blue-600">Informal Retail</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
          We bridge the gap between traditional shops and formal finance using behavior-based tracking and manual-first automation.
        </p>
      </section>

      {/* The 4-Step Process */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="premium-card p-8 relative flex flex-col items-start gap-6 group hover:translate-y-[-4px]">
              <div className="absolute top-4 right-6 text-4xl font-black text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
                0{i + 1}
              </div>
              <div className={`p-4 rounded-2xl ${
                step.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                step.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                step.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                <step.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed font-medium text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Deep Dive: Smart Profiling */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="premium-card overflow-hidden grid md:grid-cols-2 items-center bg-slate-50 border-none shadow-xl">
          <div className="p-12 lg:p-16 flex flex-col gap-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Smart Credit Profiling <br/> 
              <span className="text-slate-400">Beyond the Ledger</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Behavioral Scoring", desc: "We track repayment velocity and consistency, not just balance." },
                { title: "Risk Mitigation", desc: "Automated alerts for at-risk accounts help you collect faster." },
                { title: "Trust Network", desc: "Build a reputation that banks and suppliers can finally see." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 h-5 w-5 min-w-[20px] rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs font-medium text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
               <Link href="/login" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                 Join Pilot Program <ChevronRight className="h-4 w-4" />
               </Link>
            </div>
          </div>
          <div className="bg-slate-900 h-full p-12 relative flex items-center justify-center overflow-hidden min-h-[400px]">
            {/* Visual Representation of Scoring */}
            <div className="relative z-10 flex flex-col gap-6 w-full max-w-[280px]">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Trust Index</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-white tracking-tighter">784</span>
                  <span className="text-[10px] font-bold text-emerald-400">+12.4%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                   <div className="h-full w-[78%] bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                 <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-white" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Merchant Verified</span>
                    <span className="text-[10px] text-white/40">Tier 1 Compliance</span>
                 </div>
              </div>
            </div>
            {/* Decorative mesh background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[120px]" />
          </div>
        </div>
      </section>

      {/* FAQ / Simple CTA */}
      <footer className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Ready to transform your shop?</h2>
          <p className="text-slate-500 font-medium mb-10">Start recording manual entries today and build your digital future.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="btn-primary">
              View Pricing Plans
            </Link>
            <Link href="/dashboard" className="px-8 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">
              Launch Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
