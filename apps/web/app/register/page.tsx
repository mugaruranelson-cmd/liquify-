"use client";

import React, { useState } from "react";
import { 
  ShopIcon, 
  UserIcon, 
  CreditCardIcon, 
  PhoneIcon, 
  CheckIcon, 
  ChevronRight, 
  ChevronLeft,
  Store,
  UserCheck,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Step = 1 | 2 | 3 | 4;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    shopName: "",
    area: "",
    businessType: "Liquor store",
    ownerName: "",
    phone: "",
    idNumber: "",
    otp: "",
    defaultLimit: 1000,
    repaymentDays: 30,
    riskTolerance: "Balanced",
    mpesaId: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const steps = [
    { id: 1, name: "Shop details", icon: Store },
    { id: 2, name: "Owner", icon: UserCheck },
    { id: 3, name: "Policy", icon: ShieldCheck },
    { id: 4, name: "Payments", icon: Smartphone },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Register your shop</h1>
          <p className="mt-2 text-slate-600">Join 200+ shop owners grow their business with Liquify.</p>
        </div>

        {/* Stepper */}
        <nav className="mb-12">
          <ol className="flex items-center justify-between">
            {steps.map((s, i) => (
              <li key={s.id} className={cn("relative flex flex-col items-center gap-2", i !== steps.length - 1 && "flex-1")}>
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                  step >= s.id ? "border-brand-teal-500 bg-brand-teal-500 text-white" : "border-slate-300 bg-white text-slate-400"
                )}>
                  {step > s.id ? <CheckIcon className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <span className={cn("text-xs font-semibold", step >= s.id ? "text-brand-teal-500" : "text-slate-400")}>
                  {s.name}
                </span>
                {i !== steps.length - 1 && (
                  <div className={cn(
                    "absolute left-[calc(50%+25px)] top-5 h-0.5 w-[calc(100%-50px)]",
                    step > s.id ? "bg-brand-teal-500" : "bg-slate-200"
                  )} />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Wizard Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Shop name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kamau's General Store"
                  className="mt-1 block w-full rounded-md border border-slate-300 px-4 py-2 focus:border-brand-teal-500 focus:ring-brand-teal-500"
                  value={formData.shopName}
                  onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Area / Estate</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Westlands"
                    className="mt-1 block w-full rounded-md border border-slate-300 px-4 py-2 focus:border-brand-teal-500 focus:ring-brand-teal-500"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Business type</label>
                  <select 
                    className="mt-1 block w-full rounded-md border border-slate-300 px-4 py-2 focus:border-brand-teal-500 focus:ring-brand-teal-500"
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  >
                    <option>Liquor store</option>
                    <option>General shop</option>
                    <option>Pharmacy</option>
                    <option>Hardware</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Owner full name</label>
                <input 
                  type="text" 
                  placeholder="John Kamau"
                  className="mt-1 block w-full rounded-md border border-slate-300 px-4 py-2 focus:border-brand-teal-500 focus:ring-brand-teal-500"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Phone number</label>
                <div className="relative mt-1">
                  <span className="absolute left-4 top-2 text-slate-400">+254</span>
                  <input 
                    type="tel" 
                    placeholder="712 345 678"
                    className="block w-full rounded-md border border-slate-300 pl-16 pr-4 py-2 focus:border-brand-teal-500 focus:ring-brand-teal-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Enter OTP (sent via SMS)</label>
                <input 
                  type="text" 
                  placeholder="6-digit code"
                  className="mt-1 block w-full rounded-md border border-slate-300 px-4 py-3 text-center text-lg tracking-widest focus:border-brand-teal-500 focus:ring-brand-teal-500"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Default credit limit (KES)</label>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="500"
                  className="mt-4 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-teal-500"
                  value={formData.defaultLimit}
                  onChange={(e) => setFormData({...formData, defaultLimit: parseInt(e.target.value)})}
                />
                <div className="flex justify-between text-lg font-bold text-slate-900 mt-2">
                  <span>KES 500</span>
                  <span className="text-brand-teal-500">KES {formData.defaultLimit}</span>
                  <span>KES 5,000</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Repayment window</label>
                  <div className="space-y-2 mt-2">
                    {[7, 14, 30].map((d) => (
                      <label key={d} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="repayment" 
                          checked={formData.repaymentDays === d} 
                          className="accent-brand-teal-500 h-4 w-4"
                          onChange={() => setFormData({...formData, repaymentDays: d})}
                        />
                        <span className="text-sm text-slate-600">{d} days</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Risk tolerance</label>
                  <select 
                    className="mt-1 block w-full rounded-md border border-slate-300 px-4 py-2 focus:border-brand-teal-500 focus:ring-brand-teal-500"
                    value={formData.riskTolerance}
                    onChange={(e) => setFormData({...formData, riskTolerance: e.target.value})}
                  >
                    <option>Conservative</option>
                    <option>Balanced</option>
                    <option>Aggressive</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-brand-teal-500" />
                  M-Pesa Business Config
                </h4>
                <p className="text-xs text-slate-500 mt-1">We need this to auto-reconcile payments and trigger STK push.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Paybill or Till Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. 123456"
                  className="mt-1 block w-full rounded-md border border-slate-300 px-4 py-2 focus:border-brand-teal-500 focus:ring-brand-teal-500"
                  value={formData.mpesaId}
                  onChange={(e) => setFormData({...formData, mpesaId: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-3 p-4 rounded-md bg-amber-50 border border-amber-100 italic text-sm text-amber-800">
                <span>Note: We'll send a test KES 1 transaction to verify this number once you finish.</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              className={cn(
                "flex items-center gap-2 font-semibold text-slate-500 hover:text-slate-900 transition-colors",
                step === 1 && "invisible"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <button
              onClick={step === 4 ? () => alert("Registration complete!") : nextStep}
              className="flex items-center gap-2 rounded-md bg-brand-teal-500 px-8 py-3 font-semibold text-white transition-all hover:bg-brand-teal-700 shadow-md shadow-brand-teal-500/20"
            >
              {step === 4 ? "Finish" : "Next"}
              {step !== 4 && <ChevronRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
