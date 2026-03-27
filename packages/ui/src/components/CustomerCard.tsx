import React from "react";
import { TierBadge, type Tier } from "./TierBadge";
import { formatKES } from "../utils/formatKES";
import { displayPhone } from "../utils/phone";

interface CustomerCardProps {
  name: string;
  phone: string;
  score: number;
  tier: Tier;
  balance: number;
  lastVisit?: string;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  phone,
  score,
  tier,
  balance,
  lastVisit,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-[72px] items-center justify-between rounded-md border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-brand-teal-500 text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="truncate font-medium text-slate-900">{name}</span>
          <span className="text-xs text-slate-500">{displayPhone(phone)}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <TierBadge tier={tier} className="px-2 py-0" score={score} />
          <span className="font-semibold text-slate-900">{formatKES(balance)}</span>
        </div>
        {lastVisit && (
          <span className="text-[10px] text-slate-400">Last visit: {lastVisit}</span>
        )}
      </div>
    </div>
  );
};
