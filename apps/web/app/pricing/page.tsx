"use client";

import Link from "next/link";
import { 
  Check, 
  Minus, 
  HelpCircle, 
  Zap, 
  ArrowRight,
  Shield,
  Users,
  MessageSquare,
  BarChart3
} from "lucide-react";

export default function PricingPage() {
  const tiers = [
    {
      name: "Bronze",
      price: "0",
      description: "Perfect for a single kiosk just getting started with digital tracking.",
      features: [
        "Up to 20 customers",
        "Manual credit recording",
        "Basic collection reminders",
        "Digital ledger access",
      ],
      cta: "Start for Free",
      color: "hover:border-[#CD7F32]/50",
      iconColor: "text-[#CD7F32]",
      bgColor: "bg-[#CD7F32]/5"
    },
    {
      name: "Silver",
      price: "1,500",
      description: "Ideal for growing shops looking to optimize their cash flow.",
      features: [
        "Up to 100 customers",
        "Smart Credit Scoring",
        "WhatsApp reminders",
        "Overdue risk alerts",
        "Monthly performance reports"
      ],
      cta: "Get Started",
      highlight: true,
      color: "border-blue-600 ring-4 ring-blue-50/50",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-600/5"
    },
    {
      name: "Gold",
      price: "4,500",
      description: "The complete solution for established retail businesses.",
      features: [
        "Unlimited customers",
        "Advanced Risk Intelligence",
        "Multi-shop management",
        "Priority 24/7 support",
        "Supplier loan processing"
      ],
      cta: "Contact Sales",
      color: "hover:border-[#EF9F27]/50",
      iconColor: "text-[#EF9F27]",
      bgColor: "bg-[#EF9F27]/5"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-600 font-sans selection:bg-blue-100 pb-20">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors group">
          <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Dashboard
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
          <Shield className="h-3.5 w-3.5" />
          Transparent Pricing
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
          Plans that grow <span className="text-blue-600">with you.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          Whether you have a single kiosk or a retail chain, our pricing is designed to be affordable and transparent.
        </p>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <div key={i} className={`premium-card p-8 flex flex-col gap-8 transition-all duration-300 relative overflow-hidden ${tier.color}`}>
            {tier.highlight && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-bl-xl">
                Most Popular
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{tier.name}</h3>
              <p className="text-sm font-medium text-slate-500 line-clamp-2">{tier.description}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">KES</span>
              <span className="text-5xl font-black text-slate-900 tracking-tighter">{tier.price}</span>
              <span className="text-sm font-bold text-slate-400">/mo</span>
            </div>
            <div className="h-[1px] bg-slate-100" />
            <ul className="flex flex-col gap-4 flex-1">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-0.5 rounded-full ${tier.iconColor} ${tier.bgColor}`}>
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-600 tracking-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/login" className={`w-full py-4 rounded-xl font-bold tracking-tight transition-all active:scale-[0.98] flex items-center justify-center ${
              tier.highlight 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}>
              {tier.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* Comparison Table (Desktop Only Preview) */}
      <section className="max-w-6xl mx-auto px-6 py-32 hidden md:block">
        <h2 className="text-2xl font-black text-slate-900 text-center mb-16 tracking-tight">Full Feature Comparison</h2>
        <div className="premium-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">Features</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-900 border-l border-slate-100 text-center">Bronze</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-blue-600 border-l border-slate-100 text-center">Silver</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-900 border-l border-slate-100 text-center">Gold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {[
                 { f: "Max Customers", b: "20", s: "100", g: "Unlimited", icon: Users },
                 { f: "Credit Issuance", b: true, s: true, g: true, icon: Zap },
                 { f: "Repayment Tracking", b: true, s: true, g: true, icon: BarChart3 },
                 { f: "Behavior Scoring", b: false, s: true, g: true, icon: Shield },
                 { f: "WhatsApp Alerts", b: false, s: true, g: true, icon: MessageSquare },
                 { f: "Multi-Shop Support", b: false, s: false, g: true, icon: Users },
               ].map((row, i) => (
                 <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                   <td className="p-5 flex items-center gap-3">
                     <row.icon className="h-4 w-4 text-slate-400" />
                     <span className="text-sm font-bold text-slate-700">{row.f}</span>
                   </td>
                   <td className="p-5 text-center border-l border-slate-50 text-sm font-medium text-slate-500">
                     {typeof row.b === 'boolean' ? (row.b ? <Check className="h-4 w-4 mx-auto text-emerald-500" /> : <Minus className="h-4 w-4 mx-auto text-slate-200" />) : row.b}
                   </td>
                   <td className="p-5 text-center border-l border-slate-50 text-sm font-bold text-blue-600 bg-blue-50/10">
                     {typeof row.s === 'boolean' ? (row.s ? <Check className="h-4 w-4 mx-auto text-blue-500" /> : <Minus className="h-4 w-4 mx-auto text-slate-200" />) : row.s}
                   </td>
                   <td className="p-5 text-center border-l border-slate-50 text-sm font-medium text-slate-900">
                     {typeof row.g === 'boolean' ? (row.g ? <Check className="h-4 w-4 mx-auto text-slate-900" /> : <Minus className="h-4 w-4 mx-auto text-slate-200" />) : row.g}
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20 pb-32">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-16">Frequently Asked Questions</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {[
            { q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade your plan at any time from your dashboard settings." },
            { q: "Is there a long-term contract?", a: "No. All plans are billed monthly and you can cancel at any time with no penalties." },
            { q: "What happens if I exceed my limit?", a: "We'll notify you when you're close to your limit. You can choose to upgrade or wait until the next cycle." },
            { q: "Do you offer custom pricing?", a: "For large retail networks or wholesale distributors, please contact our sales team for custom quotes." }
          ].map((faq, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold tracking-tight">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                {faq.q}
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Footer CTA */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Start building your shop’s <br/> digital credit score today.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
               <Link href="/login" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all flex items-center gap-2">
                 Join the Pilot <ArrowRight className="h-5 w-5" />
               </Link>
               <Link href="/login" className="bg-white/10 text-white border border-white/10 px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center">
                 Speak to a Human
               </Link>
            </div>
          </div>
          {/* Decorative mesh */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 blur-[150px] group-hover:bg-blue-600/40 transition-colors" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/20 blur-[100px]" />
        </div>
      </section>
    </div>
  );
}
