import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LOCATIONS, type Location } from "@/data/locations";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Sparkles } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function LocationModal({ open, onOpenChange }: Props) {
  const { setLocation, location } = useAuth();
  const [picked, setPicked] = useState<Location | null>(location);

  const confirm = () => {
    if (!picked) return;
    setLocation(picked);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.3em]">Step 1 of 1</span>
          </div>
          <DialogTitle className="font-display text-3xl text-foreground flex items-center gap-2">
            <MapPin className="h-7 w-7 text-primary" />
            Pick your city
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            We'll show you halls, showtimes & releases tailored to where you watch.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {LOCATIONS.map((loc, i) => {
            const active = picked?.id === loc.id;
            return (
              <motion.button
                key={loc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPicked(loc)}
                className={`relative rounded-2xl p-4 text-left border transition-all ${
                  active
                    ? "border-primary bg-primary/10 shadow-[var(--shadow-glow-amber)]"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="text-3xl">{loc.emoji}</div>
                <div className="mt-2 font-display text-xl tracking-wide text-foreground">
                  {loc.city}
                </div>
                <div className="text-xs text-muted-foreground">{loc.country}</div>
                <div className="mt-1 text-[10px] text-primary/80 uppercase tracking-widest">
                  {loc.halls} halls
                </div>
              </motion.button>
            );
          })}
        </div>

        <Button
          disabled={!picked}
          onClick={confirm}
          className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[var(--shadow-glow-amber)] disabled:opacity-40 disabled:shadow-none"
        >
          {picked ? `Continue with ${picked.city} →` : "Choose a city to continue"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
