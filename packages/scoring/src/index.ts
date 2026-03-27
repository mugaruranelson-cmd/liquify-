/**
 * Liquify Behavior-Based Credit Scoring Engine
 * 
 * Formula: Score = (W1 × RepaymentRate) + (W2 × ConsistencyScore) + (W3 × FrequencyScore) + (W4 × RecencyScore) − Penalties
 * 
 * Weights:
 * W1 (Repayment)    : 0.40 - Most critical (did they pay?)
 * W2 (Consistency)  : 0.25 - Reliability (do they pay on time?)
 * W3 (Frequency)    : 0.20 - Customer value (how often do they visit?)
 * W4 (Recency)      : 0.15 - Active status (when did they last visit?)
 */

export type CreditTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

export interface ScoreFactors {
  repaymentRate: number;      // 0-100: (on-time payments / total events)
  consistencyScore: number;   // 0-100: (streak of on-time payments, capped at 10)
  frequencyScore: number;     // 0-100: (visits in last 90 days / target 12)
  recencyScore: number;       // 0-100: (decay from 100 based on weeks since last visit)
  penalties: number;          // 0-40 : (defaults and late payments)
}

export const SCORING_WEIGHTS = {
  REPAYMENT: 0.40,
  CONSISTENCY: 0.25,
  FREQUENCY: 0.20,
  RECENCY: 0.15,
};

export const TIER_THRESHOLDS = {
  PLATINUM: 80,
  GOLD: 60,
  SILVER: 40,
  BRONZE: 0,
};

/**
 * Calculates the raw Liquify Score (0-100)
 */
export function calculateLiquifyScore(factors: ScoreFactors): number {
  const weightedScore = 
    (factors.repaymentRate * SCORING_WEIGHTS.REPAYMENT) +
    (factors.consistencyScore * SCORING_WEIGHTS.CONSISTENCY) +
    (factors.frequencyScore * SCORING_WEIGHTS.FREQUENCY) +
    (factors.recencyScore * SCORING_WEIGHTS.RECENCY);

  const finalScore = Math.max(0, Math.min(100, weightedScore - factors.penalties));
  return Math.round(finalScore);
}

/**
 * Assigns a Credit Tier based on the score
 */
export function getTierFromScore(score: number): CreditTier {
  if (score >= TIER_THRESHOLDS.PLATINUM) return "PLATINUM";
  if (score >= TIER_THRESHOLDS.GOLD) return "GOLD";
  if (score >= TIER_THRESHOLDS.SILVER) return "SILVER";
  return "BRONZE";
}

/**
 * Technical Implementation for DB recalculation
 * This captures the logic required when a transaction event occurs.
 */
export function updateScoreOnEvent(params: {
  currentScore: number;
  eventType: 'ON_TIME_PAYMENT' | 'LATE_PAYMENT' | 'DEFAULT' | 'NEW_CREDIT';
  history: any[]; // In real implementation, this would be a list of recent transactions
}): number {
  // Logic to adjust factors based on the new event
  // For MVP, we use these heuristics:
  let newScore = params.currentScore;

  switch (params.eventType) {
    case 'ON_TIME_PAYMENT':
      newScore += 8; // Reward on-time payment
      break;
    case 'LATE_PAYMENT':
      newScore -= 5; // Penalty for tardiness
      break;
    case 'DEFAULT':
      newScore -= 30; // Heavy penalty for default
      break;
    case 'NEW_CREDIT':
      newScore += 1; // Slight nudge for active use (recency)
      break;
  }

  return Math.max(0, Math.min(100, newScore));
}
