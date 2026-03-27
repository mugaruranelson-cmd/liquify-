import React from "react";
import { ArrowLeft, CheckCircle2, Search, User } from "lucide-react";
import Link from "next/link";
import { getCustomers } from "../../../lib/customer-actions";
import { recordPayment } from "../../../lib/actions";
import { redirect } from "next/navigation";

export default async function ManualRepaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";
  const merchantId = "merchant_mock_123"; // In reality, get from session
  
  const { customers } = await getCustomers({
    merchantId,
    search: query,
    pageSize: 5
  });

  async function handleRecordPayment(formData: FormData) {
    "use server";
    const customerId = formData.get("customerId") as string;
    const amountStr = formData.get("amount") as string;
    const note = formData.get("note") as string;
    const amount = Math.round(parseFloat(amountStr) * 100);

    if (!customerId || isNaN(amount)) return;

    await recordPayment({
      customerId,
      merchantId: "merchant_mock_123",
      amount,
      paymentMethod: "CASH",
      description: note || "Manual cash payment",
    });

    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Record Payment</h1>
          <p className="text-slate-500">Log a manual cash payment from a customer.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <form action={handleRecordPayment} className="p-8 space-y-8">
          {/* Customer Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Select Customer</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or phone..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-teal-500 outline-none transition-all"
                defaultValue={query}
                // In a real app, this would be an autocomplete. For now, we use a simple list below.
              />
            </div>
            
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {customers.map((c: any) => (
                <label key={c.id} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-brand-teal-500/50 hover:bg-brand-teal-50/30 transition-all cursor-pointer group">
                  <input type="radio" name="customerId" value={c.id} className="accent-brand-teal-500 h-4 w-4" required />
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-teal-100 group-hover:text-brand-teal-600 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-slate-900">{c.fullName}</span>
                    <span className="text-xs text-slate-500">{c.phoneNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase">Limit</span>
                    <div className="font-bold text-slate-900">KES {c.creditLimit}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Amount and Note */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Amount (KES)</label>
              <input 
                name="amount"
                type="number" 
                placeholder="0.00" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-teal-500 outline-none font-bold text-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Note (Optional)</label>
              <input 
                name="note"
                type="text" 
                placeholder="e.g. Cleared back debt" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-teal-500 outline-none"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-teal-500 hover:bg-brand-teal-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand-teal-500/20 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Record Cash Payment
          </button>
        </form>
      </div>
    </div>
  );
}
