import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, Ticket as TicketIcon } from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { QRPlaceholder } from "@/components/QRPlaceholder";

interface Booking {
  id: string;
  movie_id: string;
  movie_title: string;
  poster_url: string;
  city: string;
  hall: string;
  show_date: string;
  showtime: string;
  seats: string[];
  total: number;
  ticket_code: string;
  created_at: string;
}

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "My Wallet — CineVault" },
      { name: "description", content: "Your active and past movie tickets." },
    ],
  }),
  component: () => (
    <AuthProvider>
      <Toaster theme="dark" />
      <WalletPage />
    </AuthProvider>
  ),
});

function WalletPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/" });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setBookings(data as Booking[]);
      else setBookings([]);
    })();
  }, [user, loading, navigate]);

  const today = new Date().toISOString().slice(0, 10);
  const active = (bookings ?? []).filter((b) => b.show_date >= today);
  const past = (bookings ?? []).filter((b) => b.show_date < today);

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-4xl sm:text-5xl tracking-wider">My Wallet</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your tickets — show the QR at the entrance.
        </p>

        <Tabs defaultValue="active" className="mt-6">
          <TabsList className="bg-white/5">
            <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-5 space-y-4">
            {bookings === null ? (
              <Skeleton />
            ) : active.length === 0 ? (
              <EmptyState />
            ) : (
              active.map((b) => <TicketCard key={b.id} booking={b} />)
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-5 space-y-4">
            {bookings === null ? (
              <Skeleton />
            ) : past.length === 0 ? (
              <p className="text-muted-foreground text-sm">No past bookings yet.</p>
            ) : (
              past.map((b) => <TicketCard key={b.id} booking={b} used />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TicketCard({ booking, used }: { booking: Booking; used?: boolean }) {
  return (
    <div
      className={`glass-card overflow-hidden grid grid-cols-1 sm:grid-cols-[1fr_auto] ${
        used ? "grayscale opacity-70" : ""
      }`}
    >
      <div className="p-5 flex gap-4 relative">
        <img
          src={booking.poster_url}
          alt={booking.movie_title}
          className="h-28 w-20 object-cover rounded-md border border-white/10 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-2xl truncate">{booking.movie_title}</h3>
            {used && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-wider">
                Used
              </span>
            )}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-y-1 text-xs text-muted-foreground">
            <Info icon={<MapPin className="h-3 w-3" />} text={`${booking.hall}, ${booking.city}`} />
            <Info icon={<Calendar className="h-3 w-3" />} text={booking.show_date} />
            <Info icon={<Clock className="h-3 w-3" />} text={booking.showtime} />
            <Info icon={<TicketIcon className="h-3 w-3" />} text={`${booking.seats.length} seat${booking.seats.length === 1 ? "" : "s"}`} />
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {booking.seats.map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground font-mono">
            #{booking.ticket_code} · ${Number(booking.total).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Torn perforation divider */}
      <div className="hidden sm:flex items-center px-2">
        <div className="h-[80%] border-l-2 border-dashed border-white/15" />
      </div>
      <div className="block sm:hidden border-t-2 border-dashed border-white/15 mx-5" />

      <div className="p-5 flex flex-col items-center justify-center gap-2 sm:pr-6">
        <QRPlaceholder value={booking.ticket_code} size={120} />
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scan at entrance
        </p>
      </div>
    </div>
  );
}

function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1 truncate">
      <span className="text-primary">{icon}</span>
      {text}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass-card p-10 text-center">
      <TicketIcon className="h-10 w-10 mx-auto text-primary mb-3" />
      <h3 className="font-display text-2xl">No active tickets</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Book a movie and your tickets will appear here.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          Browse movies
        </Button>
      </Link>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[0, 1].map((i) => (
        <div key={i} className="glass-card h-40 animate-pulse" />
      ))}
    </div>
  );
}
