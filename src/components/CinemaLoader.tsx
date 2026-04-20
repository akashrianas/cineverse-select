import { motion } from "framer-motion";
import { Film } from "lucide-react";

interface Props {
  label?: string;
  sublabel?: string;
}

/**
 * Cinematic full-screen loader. Use as overlay during route transitions or
 * any short async operation so the user always knows something is happening.
 */
export function CinemaLoader({ label = "Setting the scene", sublabel = "Just a moment…" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-xl bg-background/80"
      role="status"
      aria-live="polite"
    >
      {/* Film reel */}
      <div className="relative h-24 w-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3.6, ease: "linear", repeat: Infinity }}
          className="absolute inset-2 rounded-full border-2 border-dashed border-indigo/30"
          style={{ borderColor: "color-mix(in oklab, var(--indigo) 40%, transparent)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-12 w-12 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle, var(--amber-glow) 0%, transparent 70%)",
            }}
          >
            <Film className="h-6 w-6 text-primary" />
          </motion.div>
        </div>
      </div>

      {/* Label */}
      <motion.p
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-6 font-display text-2xl tracking-[0.2em] text-foreground"
      >
        {label}
      </motion.p>
      <p className="mt-1 text-xs uppercase tracking-[0.4em] text-muted-foreground">
        {sublabel}
      </p>

      {/* Marquee dots */}
      <div className="mt-5 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
        ))}
      </div>
    </motion.div>
  );
}
