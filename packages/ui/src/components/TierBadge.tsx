import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Tier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

interface TierBadgeProps {
  tier: Tier;
  score?: number;
  className?: string;
}

const tierConfig: Record<Tier, { label: string; className: string; range: string }> = {
  BRONZE: {
    label: "Bronze",
    range: "0–39",
    className: "bg-tier-bronze-bg text-tier-bronze-text",
  },
  SILVER: {
    label: "Silver",
    range: "40–59",
    className: "bg-tier-silver-bg text-tier-silver-text",
  },
  GOLD: {
    label: "Gold",
    range: "60–79",
    className: "bg-tier-gold-bg text-tier-gold-text",
  },
  PLATINUM: {
    label: "Platinum",
    range: "80–100",
    className: "bg-tier-platinum-bg text-tier-platinum-text",
  },
};

export const TierBadge: React.FC<TierBadgeProps> = ({ tier, score, className }) => {
  const config = tierConfig[tier];
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        config.className,
        className
      )}
    >
      {config.label} {config.range ? `· ${config.range}` : ""}
    </div>
  );
};
