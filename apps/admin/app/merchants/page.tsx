import React from "react";
import { Search, Filter, MoreVertical, Plus, Building2 } from "lucide-react";

const merchants = [
  { id: "1", name: "Kamau Supermarket", owner: "John Kamau", location: "Kawangware", status: "ACTIVE", customers: 142, outstanding: 450000, plan: "GROWTH" },
  { id: "2", name: "Mama Mboga Direct", owner: "Mary Wanjiku", location: "Westlands", status: "ACTIVE", customers: 89, outstanding: 120000, plan: "FREE" },
  { id: "3", name: "Kawangware Liquor", owner: "David Omndi", location: "Kawangware", status: "PENDING", customers: 0, outstanding: 0, plan: "FREE" },
  { id: "4", name: "Mwangaza General", owner: "Sarah Kimani", location: "Eldoret", status: "ACTIVE", customers: 215, outstanding: 890000, plan: "PRO" },
];

export default function MerchantsPage() {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Merchants</h1>
          <p className="text-slate-500 mt-1">Manage and monitor all shops on the Liquify platform.</p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-brand-teal-500 px-4 py-2 font-semibold text-white hover:bg-brand-teal-700 transition-colors">
          <Plus className="h-4 w-4" />
          Add Merchant
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Filters */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by shop name, owner, or phone..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:border-brand-teal-500 focus:ring-brand-teal-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 hover:bg-slate-50 font-medium text-slate-600">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Shop Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Customers</th>
                <th className="px-6 py-4">Outstanding (KES)</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {merchants.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{m.name}</span>
                      <span className="text-xs text-slate-500">{m.owner} · {m.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      m.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600">{m.plan}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{m.customers}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    KES {(m.outstanding / 100).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
