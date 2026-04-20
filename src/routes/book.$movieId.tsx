import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { SeatMap } from "@/components/SeatMap";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { MOVIES } from "@/data/mockMovies";
import { HALLS_BY_CITY } from "@/data/halls";
import { buildSeatMap, type Seat } from "@/data/seats";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$movieId")({
  head: ({ params }) => ({
    meta: [
      { title: `Book Tickets — CineVault` },
      { name: "description", content: `Reserve your seats for ${params.movieId}.` },
    ],
  }),
  component: () => (
    <AuthProvider>
      <Toaster theme="dark" />
      <BookingPage />
    </AuthProvider>
  ),
});

function BookingPage() {
  const { movieId } = Route.useParams();
  const { user, location } = useAuth();
  const navigate = useNavigate();

  const movie = MOVIES.find((m) => m.id === movieId);

  const dates = useMemo(() => {
    const out: { iso: string; weekday: string; day: string }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      out.push({
        iso: d.toISOString().slice(0, 10),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        day: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      });
    }
    return out;
  }, []);

  const halls = location ? (HALLS_BY_CITY[location.id] ?? []) : [];
  const [hall, setHall] = useState<string>("");
  const [date, setDate] = useState<string>(dates[0].iso);
  const [time, setTime] = useState<string>(movie?.showtimes[2] ?? "");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (!hall && halls.length) setHall(halls[0]);
  }, [halls, hall]);

  // Reset selection when show changes
  useEffect(() => {
    setSelected(new Set());
  }, [hall, date, time, movieId]);

  const seatSeed = `${movieId}|${hall}|${date}|${time}`;
  const seats = useMemo(() => buildSeatMap(seatSeed), [seatSeed]);

  const selectedSeats: Seat[] = useMemo(
    () => seats.filter((s) => selected.has(s.id)),
    [seats, selected],
  );
  const total = selectedSeats.reduce((s, x) => s + x.price, 0);

  if (!movie) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-4xl">Movie not found</h1>
          <Link to="/" className="text-primary underline mt-4 inline-block">
            Back to lobby
          </Link>
        </div>
      </div>
    );
  }

  const toggle = (seat: Seat) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else if (next.size >= 8) {
        toast.error("Max 8 seats per booking");
        return prev;
      } else next.add(seat.id);
      return next;
    });
  };

  const handleCheckout = () => {
    if (!user) return toast.error("Please sign in to continue");
    if (!location) return toast.error("Pick your city first");
    if (!hall || !time) return toast.error("Choose a hall and showtime");
    if (selected.size === 0) return toast.error("Select at least one seat");
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen pb-32">
      <Navbar />

      {/* Backdrop header */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src={movie.backdropUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-6">
          <Button
            onClick={() => navigate({ to: "/" })}
            variant="ghost"
            size="sm"
            className="w-fit mb-2 hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="font-display text-4xl sm:text-5xl">{movie.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {movie.genre} · {movie.duration} · ★ {movie.rating}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        {/* Hall picker */}
        {location && (
          <section className="glass-card p-5">
            <SectionHeader icon={<MapPin className="h-4 w-4" />} title="Choose hall" hint={location.city} />
            <div className="flex flex-wrap gap-2">
              {halls.map((h) => (
                <PillButton key={h} active={hall === h} onClick={() => setHall(h)}>
                  {h}
                </PillButton>
              ))}
            </div>
          </section>
        )}

        {/* Date picker */}
        <section className="glass-card p-5">
          <SectionHeader icon={<Calendar className="h-4 w-4" />} title="Pick a date" />
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden -mx-1 px-1 pb-1">
            {dates.map((d) => {
              const active = date === d.iso;
              return (
                <button
                  key={d.iso}
                  onClick={() => setDate(d.iso)}
                  className={`shrink-0 px-4 py-2 rounded-xl border text-center transition ${
                    active
                      ? "border-primary bg-primary/10 shadow-[var(--shadow-glow-amber)]"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {d.weekday}
                  </div>
                  <div className={`font-display text-lg ${active ? "text-primary" : ""}`}>
                    {d.day}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Time picker */}
        <section className="glass-card p-5">
          <SectionHeader icon={<Clock className="h-4 w-4" />} title="Showtime" />
          <div className="flex flex-wrap gap-2">
            {movie.showtimes.map((t) => (
              <PillButton key={t} active={time === t} onClick={() => setTime(t)}>
                {t}
              </PillButton>
            ))}
          </div>
        </section>

        {/* Seat map */}
        <section className="glass-card p-5">
          <SectionHeader icon={<Ticket className="h-4 w-4" />} title="Select your seats" />
          <SeatMap seats={seats} selected={selected} onToggle={toggle} />
        </section>
      </main>

      {/* Sticky pricing bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 backdrop-blur-xl bg-background/80 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              🎟️ {selected.size} seat{selected.size === 1 ? "" : "s"} selected
            </p>
            <p className="font-display text-2xl text-foreground">
              ${total.toFixed(2)}
            </p>
          </div>
          <Button
            disabled={selected.size === 0}
            onClick={handleCheckout}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[var(--shadow-glow-amber)] disabled:opacity-30 disabled:shadow-none"
          >
            Continue to Checkout →
          </Button>
        </div>
      </div>

      {hall && time && (
        <CheckoutModal
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          movie={movie}
          hall={hall}
          showDate={date}
          showtime={time}
          selectedSeats={selectedSeats}
        />
      )}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      {hint && <span className="text-xs text-primary">{hint}</span>}
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition border ${
        active
          ? "border-primary bg-primary/10 text-primary shadow-[var(--shadow-glow-amber)]"
          : "border-white/10 bg-white/5 text-foreground hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}
