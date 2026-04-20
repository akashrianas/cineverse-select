import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { generateTicketCode, type Seat } from "@/data/seats";
import { toast } from "sonner";
import type { Movie } from "@/data/mockMovies";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  movie: Movie;
  hall: string;
  showDate: string;
  showtime: string;
  selectedSeats: Seat[];
}

export function CheckoutModal({
  open,
  onOpenChange,
  movie,
  hall,
  showDate,
  showtime,
  selectedSeats,
}: Props) {
  const { user, location } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = selectedSeats.reduce((s, x) => s + x.price, 0);
  const fee = Math.round(subtotal * 0.1 * 100) / 100;
  const total = Math.round((subtotal + fee) * 100) / 100;

  const tierBreakdown = selectedSeats.reduce<Record<string, number>>((acc, s) => {
    acc[s.tier] = (acc[s.tier] ?? 0) + 1;
    return acc;
  }, {});

  const pay = async () => {
    if (!user || !location) {
      toast.error("Please sign in and pick a city");
      return;
    }
    setBusy(true);
    const ticketCode = generateTicketCode();
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      movie_id: movie.id,
      movie_title: movie.title,
      poster_url: movie.posterUrl,
      city: location.city,
      hall,
      show_date: showDate,
      showtime,
      seats: selectedSeats.map((s) => s.id),
      seat_tier_breakdown: tierBreakdown,
      subtotal,
      fee,
      total,
      ticket_code: ticketCode,
    });
    setBusy(false);
    if (error) {
      toast.error("Payment failed", { description: error.message });
      return;
    }
    setDone(true);
    setTimeout(() => {
      onOpenChange(false);
      setDone(false);
      navigate({ to: "/wallet" });
    }, 1400);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
      <DialogContent className="glass-card border-white/10 sm:max-w-md">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--emerald)" }}
              >
                <CheckCircle2 className="h-12 w-12 text-background" />
              </motion.div>
              <h3 className="font-display text-3xl">Booking Confirmed</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Heading to your wallet…
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }}>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  Confirm Booking
                </DialogTitle>
              </DialogHeader>

              <div className="flex gap-3 mt-3">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-24 w-16 object-cover rounded-md border border-white/10"
                />
                <div className="flex-1">
                  <h4 className="font-display text-xl leading-tight">{movie.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{hall}</p>
                  <p className="text-xs text-muted-foreground">
                    {showDate} · {showtime}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Seats ({selectedSeats.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((s) => (
                    <span
                      key={s.id}
                      className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                    >
                      {s.id} · {s.tier}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-sm border-t border-white/10 pt-3">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Convenience fee (10%)" value={`$${fee.toFixed(2)}`} />
                <Row
                  label="Total"
                  value={`$${total.toFixed(2)}`}
                  bold
                />
              </div>

              <Button
                onClick={pay}
                disabled={busy}
                className="w-full mt-5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[var(--shadow-glow-amber)]"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-foreground font-semibold text-base pt-1" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
