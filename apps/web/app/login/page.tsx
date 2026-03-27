"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  EyeOff, 
  Info,
  ChevronLeft,
  Smartphone
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans selection:bg-blue-100">
      {/* Left Column: Branding & Instructions */}
      <div className="md:w-1/2 bg-slate-900 p-8 md:p-20 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold mb-16">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">Liquify<span className="text-blue-500">.</span></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-8">
            Manage your shop’s <br/> 
            <span className="text-blue-500 text-glow">financial heartbeat.</span>
          </h1>
          
          <div className="space-y-8 mt-12">
            <div className="flex gap-4">
              <div className="h-10 w-10 min-w-[40px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 tracking-tight">Pilot Access Instructions</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  To participate in the manual pilot, please use the credentials provided in your merchant welcome kit.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Test Merchant Credentials</span>
               <div className="grid gap-4">
                  <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    <span className="text-[13px] text-slate-400 font-medium">Email:</span>
                    <span className="text-[13px] font-bold text-white">admin@liquify.shop</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    <span className="text-[13px] text-slate-400 font-medium">Password:</span>
                    <span className="text-[13px] font-bold text-white">pilot2026</span>
                  </div>
               </div>
               <p className="text-[11px] text-slate-500 font-medium italic mt-2">
                 * Note: All data in the pilot is wiped every 24 hours.
               </p>
            </div>
          </div>
        </div>

        {/* Decorative backdrop */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 blur-[150px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 pt-10 border-t border-white/10 text-[11px] font-bold text-slate-500 uppercase tracking-widest flex justify-between items-center">
          <span>&copy; 2026 Liquify Technologies</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-help transition-colors">Privacy</span>
            <span className="hover:text-white cursor-help transition-colors">Terms</span>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="md:w-1/2 p-8 md:p-20 flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-[400px] flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 font-medium text-sm">Sign in to your merchant dashboard.</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider pl-1">Email or Phone</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="name@liquify.shop"
                  className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider">Password</label>
                <button className="text-[11px] font-bold text-blue-600 hover:underline transition-all">Forgot?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 bg-white border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all placeholder:text-slate-300"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 px-2 transition-colors">
                  <EyeOff className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button className="btn-primary w-full h-14 text-base flex items-center justify-center gap-2 mt-4">
              Sign In <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] flex-1 bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Alternative Access</span>
            <div className="h-[1px] flex-1 bg-slate-200" />
          </div>

          <button className="h-14 w-full bg-white border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.98]">
            <Smartphone className="h-5 w-5 text-emerald-600" />
            Continue with WhatsApp
          </button>

          <p className="text-center text-sm font-medium text-slate-500">
            Internal merchant application? <Link href="/contact" className="text-blue-600 font-bold hover:underline">Apply here</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}
