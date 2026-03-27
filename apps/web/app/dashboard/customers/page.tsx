import React from "react";
import { Search, Filter, UserPlus, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { CustomerCard } from "@repo/ui";
import { getCustomers } from "../../../lib/customer-actions";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: { q?: string; tier?: string; page?: string };
}) {
  const query = searchParams.q || "";
  const tier = searchParams.tier || "ALL";
  const page = parseInt(searchParams.page || "1");
  
  // Mock merchant ID for now
  const merchantId = "merchant_mock_123";
  
  const { customers, pagination } = await getCustomers({
    merchantId,
    search: query,
    tier,
    page,
  });

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500">Manage your shop's customer base and credit scores.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-md bg-brand-teal-500 px-4 py-2.5 font-semibold text-white hover:bg-brand-teal-700 transition-colors shadow-sm">
          <UserPlus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Search & Filters */}
        <form className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              name="q"
              type="text" 
              defaultValue={query}
              placeholder="Search by name or phone number..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:border-brand-teal-500 focus:ring-brand-teal-500 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
             <select 
               name="tier"
               defaultValue={tier}
               className="bg-white px-3 py-2 rounded-md border border-slate-200 text-sm font-medium text-slate-600 focus:ring-brand-teal-500"
             >
               <option value="ALL">All Tiers</option>
               <option value="PLATINUM">Platinum</option>
               <option value="GOLD">Gold</option>
               <option value="SILVER">Silver</option>
               <option value="BRONZE">Bronze</option>
             </select>
             <button type="submit" className="bg-brand-teal-500 text-white px-4 py-2 rounded-md text-sm font-bold">
               Filter
             </button>
          </div>
        </form>

        {/* Customer List Grid */}
        {customers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {customers.map((c: any) => (
              <CustomerCard 
                key={c.id} 
                name={c.fullName}
                phone={c.phoneNumber}
                score={c.liquifyScore}
                tier={c.creditTier as any}
                balance={c.outstandingBalance}
                lastVisit={c.lastVisitAt ? "Recently" : "Never"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">No customers found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-4">
             <button 
               disabled={page <= 1}
               className="p-2 rounded-md border border-slate-200 disabled:opacity-30"
             >
               <ChevronLeft className="h-5 w-5" />
             </button>
             <span className="text-sm font-bold text-slate-600">
               Page {page} of {pagination.totalPages}
             </span>
             <button 
               disabled={page >= pagination.totalPages}
               className="p-2 rounded-md border border-slate-200 disabled:opacity-30"
             >
               <ChevronRight className="h-5 w-5" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
