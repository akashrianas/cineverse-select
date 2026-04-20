/**
 * Seat map utilities. 8 rows × 10 cols.
 * Rows A–C: Standard, D–F: Premium, G–H: Balcony.
 * "Booked" seats are deterministic per (movieId, date, showtime) so the same
 * showing always shows the same occupied seats across renders.
 */

export type SeatTier = "standard" | "premium" | "balcony";
export type SeatStatus = "available" | "booked";

export interface Seat {
  id: string; // e.g. "D4"
  row: string;
  col: number;
  tier: SeatTier;
  price: number;
  status: SeatStatus;
}

export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const COLS = 10;

export const TIER_BY_ROW: Record<string, SeatTier> = {
  A: "standard", B: "standard", C: "standard",
  D: "premium", E: "premium", F: "premium",
  G: "balcony", H: "balcony",
};

export const PRICE_BY_TIER: Record<SeatTier, number> = {
  standard: 12,
  premium: 18,
  balcony: 22,
};

// Deterministic PRNG (mulberry32)
function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildSeatMap(seedKey: string): Seat[] {
  const rand = rng(hashString(seedKey));
  const seats: Seat[] = [];
  for (const row of ROWS) {
    const tier = TIER_BY_ROW[row];
    for (let col = 1; col <= COLS; col++) {
      const booked = rand() < 0.25;
      seats.push({
        id: `${row}${col}`,
        row,
        col,
        tier,
        price: PRICE_BY_TIER[tier],
        status: booked ? "booked" : "available",
      });
    }
  }
  return seats;
}

export function tierLabel(t: SeatTier) {
  return t === "standard" ? "Standard" : t === "premium" ? "Premium" : "Balcony";
}

export function generateTicketCode() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `CRV-${s}`;
}
