import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Film, MapPin, LogOut, Ticket, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";
import { LocationModal } from "./LocationModal";

export function Navbar() {
  const { user, signOut, location } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Film className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 blur-md bg-primary/40 -z-10" />
          </div>
          <span className="font-display text-2xl tracking-[0.25em] text-foreground">
            CINEVAULT
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocOpen(true)}
              className="hidden sm:flex gap-1.5 text-foreground hover:bg-white/5"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{location?.city ?? "Pick city"}</span>
            </Button>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-white/5"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-crimson flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm text-muted-foreground max-w-[140px] truncate">
                    {user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="glass-card border-white/10 w-56"
              >
                <DropdownMenuItem className="sm:hidden" onClick={() => setLocOpen(true)}>
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {location?.city ?? "Pick city"}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <UserIcon className="h-4 w-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Ticket className="h-4 w-4 mr-2" />
                  My Wallet
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setAuthOpen(true)}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[var(--shadow-glow-amber)]"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <LocationModal open={locOpen} onOpenChange={setLocOpen} />
    </header>
  );
}
