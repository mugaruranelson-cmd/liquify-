"use client";

import React, { useEffect, useState } from "react";
import { TierBadge, type Tier } from "./TierBadge";

interface ScoreGaugeProps {
  score: number;
  tier: Tier;
  size?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, tier, size = 160 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 600;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.floor(easeProgress * score));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [score]);

  // SVG parameters for a 240-degree arc
  // Start at 150 deg, end at 30 deg (clockwise)
  const radius = (size / 2) - 10;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const arcStrokeDasharray = (circumference * 240) / 360;
  const offset = arcStrokeDasharray - (animatedScore / 100) * arcStrokeDasharray;

  const getTierColor = (t: Tier) => {
    switch (t) {
      case "BRONZE": return "#CD7F32";
      case "SILVER": return "#94A3B8";
      case "GOLD": return "#EF9F27";
      case "PLATINUM": return "#7F77DD";
      default: return "#1D9E75";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg
          height={size}
          width={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform rotate-[150deg]"
        >
          {/* Background track */}
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${arcStrokeDasharray} ${circumference}`}
            style={{ strokeLinecap: "round" }}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Active progress */}
          <circle
            stroke={getTierColor(tier)}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${arcStrokeDasharray} ${circumference}`}
            style={{ 
              strokeDashoffset: offset,
              strokeLinecap: "round",
              transition: "stroke-dashoffset 0.1s ease-out, stroke 0.3s ease-out"
            }}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-[20%] flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-slate-900">{animatedScore}</span>
        </div>
      </div>
      <TierBadge tier={tier} className="-mt-8" />
    </div>
  );
};
