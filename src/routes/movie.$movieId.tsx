import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Clock, Play, ArrowLeft, Calendar, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOVIES } from "@/data/mockMovies";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/movie/$movieId")({
  head: ({ params }) => {
    const movie = MOVIES.find((m) => m.id === params.movieId);
    return {
      meta: [
        { title: movie ? `${movie.title} — CineVault` : "Movie — CineVault" },
        { name: "description", content: movie?.synopsis?.slice(0, 155) ?? "" },
        { property: "og:title", content: movie ? `${movie.title} — CineVault` : "CineVault" },
        { property: "og:description", content: movie?.tagline ?? "" },
      ],
    };
  },
  component: () => (
    <AuthProvider>
      <Toaster theme="dark" />
      <MovieDetailsPage />
    </AuthProvider>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl text-muted-foreground">Movie not found</p>
      <Link to="/" className="text-primary hover:underline">Go Home</Link>
    </div>
  ),
});

function MovieDetailsPage() {
  const { movieId } = Route.useParams();
  const navigate = useNavigate();
  const { user, location } = useAuth();
  const movie = MOVIES.find((m) => m.id === movieId);

  if (!movie) return null;

  const handleBook = () => {
    if (!user) {
      toast.error("Please sign in to book tickets.");
      return;
    }
    if (!location) {
      toast.error("Please pick your city first.");
      return;
    }
    if (movie.status === "coming_soon") {
      toast.success(`We'll notify you when "${movie.title}" releases 🔔`);
      return;
    }
    navigate({ to: "/book/$movieId", params: { movieId: movie.id } });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Backdrop */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={movie.backdropUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 -mt-56 sm:-mt-64 pb-20">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Lobby
        </Link>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="shrink-0"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-56 sm:w-64 rounded-xl shadow-2xl border border-white/10"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="flex-1 space-y-5"
          >
            <div>
              <h1 className="font-display text-4xl sm:text-6xl text-foreground leading-none">
                {movie.title}
              </h1>
              <p className="mt-2 text-lg italic text-muted-foreground">{movie.tagline}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full font-semibold">
                <Star className="h-4 w-4 fill-primary" /> {movie.rating}/10
              </span>
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" /> {movie.duration}
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {movie.certificate}
              </span>
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4" /> {movie.releaseDate}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g} className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10">
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="font-display text-xl tracking-wider mb-2">SYNOPSIS</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{movie.synopsis}</p>
            </div>

            {/* Director & Languages */}
            <div className="flex flex-wrap gap-8 text-sm">
              <div>
                <span className="text-muted-foreground">Director</span>
                <p className="text-foreground font-semibold">{movie.director}</p>
              </div>
              <div>
                <span className="text-muted-foreground flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> Languages</span>
                <p className="text-foreground font-semibold">{movie.languages.join(", ")}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                onClick={handleBook}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-10 shadow-[var(--shadow-glow-amber)]"
              >
                <Play className="h-4 w-4 mr-1 fill-current" />
                {movie.status === "coming_soon" ? "Notify Me" : movie.status === "advance" ? "Pre-Book" : "Book Now"}
              </Button>
              {movie.trailerUrl !== "#" && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10"
                  onClick={() => window.open(movie.trailerUrl, "_blank")}
                >
                  Watch Trailer
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-14"
        >
          <h2 className="font-display text-2xl tracking-wider mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> CAST
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {movie.cast.map((c) => (
              <div key={c.name} className="glass-card p-4 flex flex-col items-center text-center gap-3">
                <img
                  src={c.photoUrl}
                  alt={c.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
