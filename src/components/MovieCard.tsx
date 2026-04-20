import { Star, Clock, Bell, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/data/mockMovies";

interface Props {
  movie: Movie;
  onAction?: (movie: Movie) => void;
}

export function MovieCard({ movie, onAction }: Props) {
  const cta =
    movie.status === "now_showing"
      ? { label: "Book Now", icon: null }
      : movie.status === "advance"
        ? { label: "Pre-Book", icon: <Calendar className="h-3.5 w-3.5" /> }
        : { label: "Notify Me", icon: <Bell className="h-3.5 w-3.5" /> };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card overflow-hidden w-[220px] sm:w-[240px] shrink-0 group"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/70 backdrop-blur-md rounded-full px-2 py-0.5 border border-white/10">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-semibold">{movie.rating}</span>
        </div>
        {movie.status === "advance" && (
          <div className="absolute top-2 left-2 bg-indigo/80 backdrop-blur-md rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
               style={{ backgroundColor: "var(--indigo)" }}>
            {movie.releaseDate}
          </div>
        )}
        {movie.status === "coming_soon" && (
          <div className="absolute top-2 left-2 bg-crimson/90 backdrop-blur-md rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
               style={{ backgroundColor: "var(--crimson)" }}>
            Coming Soon
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <h3 className="font-display text-xl tracking-wide leading-tight line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            {movie.genre}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {movie.duration}
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => onAction?.(movie)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1.5"
        >
          {cta.icon}
          {cta.label}
        </Button>
      </div>
    </motion.div>
  );
}
