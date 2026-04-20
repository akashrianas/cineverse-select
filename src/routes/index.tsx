import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { MovieCarousel } from "@/components/MovieCarousel";
import { LocationModal } from "@/components/LocationModal";
import { MOVIES, FEATURED_MOVIES, type Movie } from "@/data/mockMovies";
import { Toaster } from "@/components/ui/sonner";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineVault — Cinematic Movie Booking" },
      {
        name: "description",
        content:
          "Book tickets for the latest blockbusters in stunning cinema halls near you. Live seat selection, instant tickets.",
      },
      { property: "og:title", content: "CineVault — Cinematic Movie Booking" },
      {
        property: "og:description",
        content: "Premium movie booking with live seat selection and instant digital tickets.",
      },
    ],
  }),
  component: () => (
    <AuthProvider>
      <Toaster theme="dark" />
      <Lobby />
    </AuthProvider>
  ),
});

function Lobby() {
  const { user, location, needsLocation } = useAuth();
  const [locOpen, setLocOpen] = useState(false);

  // Auto-open location modal once after login.
  useEffect(() => {
    if (needsLocation) setLocOpen(true);
  }, [needsLocation]);

  const handleAction = (m: Movie) => {
    if (!user) {
      toast.error("Please sign in", { description: "Create an account to book tickets." });
      return;
    }
    if (!location) {
      toast.error("Pick your city first");
      setLocOpen(true);
      return;
    }
    if (m.status === "coming_soon") {
      toast.success(`We'll notify you when "${m.title}" releases 🔔`);
      return;
    }
    toast.info("Booking flow coming next", {
      description: `${m.title} · ${location.city}`,
    });
  };

  // Filter by chosen city when set.
  const visible = location
    ? MOVIES.filter((m) => m.cities.includes(location.id))
    : MOVIES;

  const nowShowing = visible.filter((m) => m.status === "now_showing");
  const advance = visible.filter((m) => m.status === "advance");
  const coming = visible.filter((m) => m.status === "coming_soon");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSlider movies={FEATURED_MOVIES} onBook={handleAction} />

        {user && location && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 -mt-8 relative z-10">
            <div className="glass-card px-4 py-3 flex items-center gap-2 text-sm w-fit">
              <MapPin className="h-4 w-4 text-primary" />
              Showing halls in{" "}
              <span className="font-semibold text-foreground">{location.city}</span>
              <button
                onClick={() => setLocOpen(true)}
                className="ml-2 text-primary hover:underline text-xs uppercase tracking-wider"
              >
                Change
              </button>
            </div>
          </div>
        )}

        <MovieCarousel
          title="Now Showing"
          subtitle="Catch tonight's blockbusters"
          movies={nowShowing}
          onAction={handleAction}
        />
        <MovieCarousel
          title="Advance Sales"
          subtitle="Lock your seats before everyone else"
          movies={advance}
          onAction={handleAction}
        />
        <MovieCarousel
          title="Coming Soon"
          subtitle="The next wave of cinema"
          movies={coming}
          onAction={handleAction}
        />

        <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
          <p className="font-display tracking-[0.3em] text-base text-foreground">CINEVAULT</p>
          <p className="mt-1">Where every seat tells a story.</p>
        </footer>
      </main>

      <LocationModal open={locOpen} onOpenChange={setLocOpen} />
    </div>
  );
}
