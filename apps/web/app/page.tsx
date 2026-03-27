import React from "react";
import Link from "next/link";
import { ScoreGauge, CustomerCard } from "@repo/ui";
import { ArrowRight, Smartphone, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container-custom flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-teal-500 flex items-center justify-center text-white font-bold">L</div>
            <span className="text-xl font-bold tracking-tight text-brand-teal-900">Liquify</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/how-it-works" className="hover:text-brand-teal-500 transition-colors">How it works</Link>
            <Link href="/pricing" className="hover:text-brand-teal-500 transition-colors">Pricing</Link>
            <Link href="/login" className="text-slate-900 hover:text-brand-teal-500 transition-colors font-bold">Sign in</Link>
            <Link href="/login" className="rounded-md bg-brand-teal-500 px-4 py-2 text-white hover:bg-brand-teal-700 transition-colors font-bold">
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-16 pt-24 lg:pt-32">
        <div className="container-custom grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your customers want credit. <br />
              <span className="text-brand-teal-500">Now you can give it safely.</span>
            </h1>
            <p className="text-lg text-slate-600 sm:text-xl">
              Liquify tracks who pays, scores every customer, and chases debt for you — automatically.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/login" className="group relative flex items-center justify-center gap-2 rounded-md bg-brand-teal-500 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-brand-teal-700">
                Start free trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/how-it-works" className="flex items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-lg font-semibold text-slate-900 transition-all hover:bg-slate-50">
                See a demo
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative z-10 w-full max-w-[320px] rounded-[2.5rem] border-[8px] border-slate-900 bg-slate-900 p-2 shadow-2xl">
              <div className="overflow-hidden rounded-[1.8rem] bg-white pt-6 pb-8 px-4">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex w-full items-center justify-between px-2">
                    <span className="text-sm font-semibold text-slate-400">Customer Profile</span>
                    <ShieldCheck className="h-5 w-5 text-brand-teal-500" />
                  </div>
                  <ScoreGauge score={78} tier="GOLD" size={180} />
                  <div className="w-full space-y-3 mt-4">
                    <CustomerCard 
                      name="Wanjiku Kamau" 
                      phone="254712345678" 
                      score={78} 
                      tier="GOLD" 
                      balance={250000} 
                      lastVisit="2 days ago"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Background blob */}
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-brand-teal-50 opacity-50 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-brand-purple-50 opacity-40 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <div className="border-y border-slate-100 bg-slate-50 py-10">
        <div className="container-custom flex flex-col items-center gap-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Trusted by 200+ shops across Nairobi</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale lg:gap-16">
            <span className="text-xl font-bold">Kamau Supermarket</span>
            <span className="text-xl font-bold">Mama Mboga Direct</span>
            <span className="text-xl font-bold">Kawangware Liquor</span>
            <span className="text-xl font-bold">Mwangaza General</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Smart scoring",
                desc: "Every customer gets a Liquify Score based on how they pay.",
                icon: Zap,
              },
              {
                title: "Automated reminders",
                desc: "WhatsApp nudges go out before debt goes bad.",
                icon: Smartphone,
              },
              {
                title: "Loyalty rewards",
                desc: "Good customers earn points. You keep them coming back.",
                icon: ShieldCheck,
              },
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-xl border border-slate-100 p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-teal-50 text-brand-teal-500">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
