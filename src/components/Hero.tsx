import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Play, Star, Clock } from "lucide-react";
import type { Movie } from "@/data/mockMovies";

interface Props {
  movie: Movie;
  onBook?: (m: Movie) => void;
}

export function Hero({ movie, onBook }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bgRef.current, { scale: 1.15, duration: 2, ease: "power2.out" });
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(tagRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });
      gsap.from(metaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: "power2.out",
      });
      gsap.from(ctaRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.7,
        delay: 0.9,
        ease: "back.out(1.7)",
      });
    });
    return () => ctx.revert();
  }, [movie.id]);

  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <div ref={bgRef} className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-end pb-16 sm:pb-24">
        <span className="text-primary text-xs uppercase tracking-[0.4em] mb-3">
          ★ Featured Tonight
        </span>
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground leading-none max-w-3xl"
        >
          {movie.title}
        </h1>
        <p
          ref={tagRef}
          className="mt-4 text-lg sm:text-xl text-muted-foreground italic max-w-xl"
        >
          {movie.tagline}
        </p>
        <div ref={metaRef} className="mt-4 flex items-center gap-4 text-sm text-foreground/90">
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
        <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
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
    </section>
  );
}
