import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import type { Movie } from "@/data/mockMovies";
import { MovieCard } from "./MovieCard";

interface Props {
  title: string;
  subtitle?: string;
  movies: Movie[];
  onAction?: (m: Movie) => void;
}

export function MovieCarousel({ title, subtitle, movies, onAction }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current || !trackRef.current) return;
      const diff = trackRef.current.scrollWidth - containerRef.current.offsetWidth;
      setDragWidth(Math.max(0, diff));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [movies]);

  if (movies.length === 0) return null;

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-4">
        <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-gradient-amber">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -dragWidth, right: 0 }}
          dragElastic={0.15}
          className="flex gap-4 px-4 sm:px-6 pb-4"
        >
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} onAction={onAction} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
