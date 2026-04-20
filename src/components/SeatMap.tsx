import { useEffect, useMemo, useRef } from "react";
import { animate } from "animejs";
import { ROWS, COLS, type Seat, type SeatTier } from "@/data/seats";

interface Props {
  seats: Seat[];
  selected: Set<string>;
  onToggle: (seat: Seat) => void;
}

const tierColor: Record<SeatTier, string> = {
  standard: "text-foreground/60",
  premium: "text-indigo",
  balcony: "text-primary",
};

export function SeatMap({ seats, selected, onToggle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastToggled = useRef<string | null>(null);

  const grid = useMemo(() => {
    const m: Record<string, Seat[]> = {};
    for (const s of seats) {
      (m[s.row] ||= []).push(s);
    }
    return m;
  }, [seats]);

  // Anime.js pop on the most recently toggled seat
  useEffect(() => {
    if (!lastToggled.current || !containerRef.current) return;
    const el = containerRef.current.querySelector<HTMLElement>(
      `[data-seat="${lastToggled.current}"]`,
    );
    if (!el) return;
    animate(el, {
      scale: [1, 1.35, 1],
      duration: 320,
      ease: "outElastic(1, .6)",
    });
  }, [selected]);

  const handleClick = (seat: Seat) => {
    if (seat.status === "booked") return;
    lastToggled.current = seat.id;
    onToggle(seat);
  };

  return (
    <div ref={containerRef} className="overflow-x-auto scrollbar-hidden -mx-4 px-4">
      <div className="min-w-[560px] mx-auto max-w-2xl">
        {/* Screen */}
        <div className="mb-10 mx-auto w-[80%]">
          <div
            className="screen-curve h-3 mx-auto"
            style={{
              background:
                "linear-gradient(180deg, var(--primary) 0%, transparent 100%)",
              boxShadow: "0 0 60px 10px var(--amber-glow)",
            }}
          />
          <p className="text-center text-[10px] tracking-[0.6em] text-muted-foreground mt-2 uppercase">
            Screen
          </p>
        </div>

        {/* Rows */}
        <div className="space-y-2.5">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-3">
              <span
                className={`w-5 text-center font-display text-sm ${tierColor[grid[row]?.[0]?.tier ?? "standard"]}`}
              >
                {row}
              </span>
              <div className="flex gap-1.5 flex-1 justify-center">
                {grid[row]?.map((seat, i) => {
                  const isSelected = selected.has(seat.id);
                  const isBooked = seat.status === "booked";
                  // visual aisle gap after seat 5
                  const aisle = i === 4 ? "mr-3" : "";
                  return (
                    <button
                      key={seat.id}
                      data-seat={seat.id}
                      onClick={() => handleClick(seat)}
                      disabled={isBooked}
                      aria-label={`Seat ${seat.id} ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                      className={[
                        "h-7 w-7 sm:h-8 sm:w-8 rounded-md text-[10px] font-semibold transition-colors",
                        aisle,
                        isBooked
                          ? "bg-crimson/30 cursor-not-allowed opacity-50 line-through"
                          : isSelected
                            ? "bg-emerald text-background shadow-[var(--shadow-glow-emerald)]"
                            : "border border-white/15 bg-white/5 hover:bg-emerald/30 hover:border-emerald/50",
                      ].join(" ")}
                      style={
                        isSelected
                          ? { backgroundColor: "var(--emerald)" }
                          : undefined
                      }
                    >
                      {seat.col}
                    </button>
                  );
                })}
              </div>
              <span className="w-5 text-center font-display text-sm text-muted-foreground/40">
                {row}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <Legend swatch="border border-white/20 bg-white/5" label="Available" />
          <Legend swatch="bg-emerald" style={{ backgroundColor: "var(--emerald)" }} label="Selected" />
          <Legend swatch="bg-crimson/40 line-through" label="Booked" />
          <span>·</span>
          <span>Standard $12</span>
          <span className="text-indigo">Premium $18</span>
          <span className="text-primary">Balcony $22</span>
        </div>
        <div className="text-center text-[10px] text-muted-foreground mt-2 sm:hidden">
          ← swipe to scroll seats →
        </div>
      </div>
    </div>
  );
}

function Legend({
  swatch,
  label,
  style,
}: {
  swatch: string;
  label: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 rounded ${swatch}`} style={style} />
      {label}
    </span>
  );
}

void COLS;
