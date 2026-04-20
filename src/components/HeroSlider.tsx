import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import type { Movie } from "@/data/mockMovies";

interface Props {
  movies: Movie[];
  onBook?: (m: Movie) => void;
  intervalMs?: number;
}

export function HeroSlider({ movies, onBook, intervalMs = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const movie = movies[index];

  // Auto-rotate
  useEffect(() => {
    if (paused || movies.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % movies.length), intervalMs);
    return () => clearInterval(t);
  }, [paused, movies.length, intervalMs]);

  // GSAP entrance per slide
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(tagRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay: 0.45,
        ease: "power3.out",
      });
      gsap.from(ctaRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        delay: 0.65,
        ease: "back.out(1.7)",
      });
    });
    return () => ctx.revert();
  }, [index]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + movies.length) % movies.length);

  if (!movie) return null;

  return (
    <section
      className="relative h-[80vh] min-h-[560px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Crossfade background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={movie.backdropUrl}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Fallback gradient if image fails */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo/40 via-background to-crimson/30"
            style={{
              background:
                "linear-gradient(135deg, var(--indigo) 0%, var(--background) 50%, var(--crimson) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-end pb-20 sm:pb-28">
        <span className="text-primary text-xs uppercase tracking-[0.4em] mb-3">
          ★ Featured Tonight
        </span>
        <h1
          key={`t-${movie.id}`}
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground leading-none max-w-3xl"
        >
          {movie.title}
        </h1>
        <p
          key={`p-${movie.id}`}
          ref={tagRef}
          className="mt-4 text-lg sm:text-xl text-muted-foreground italic max-w-xl"
        >
          {movie.tagline}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-foreground/90">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            {movie.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {movie.duration}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
            {movie.genre}
          </span>
        </div>
        <div key={`c-${movie.id}`} ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() => onBook?.(movie)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 shadow-[var(--shadow-glow-amber)]"
          >
            <Play className="h-4 w-4 mr-1 fill-current" />
            Book Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-foreground"
          >
            Watch Trailer
          </Button>
        </div>
      </div>

      {/* Arrows */}
      {movies.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {movies.map((m, i) => (
              <button
                key={m.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-primary shadow-[var(--shadow-glow-amber)]"
                    : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
