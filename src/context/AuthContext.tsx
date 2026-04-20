import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LOCATIONS, type Location } from "@/data/locations";

const LOCATION_KEY = "cinevault.location";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  location: Location | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  setLocation: (loc: Location) => void;
  needsLocation: boolean;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocationState] = useState<Location | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(LOCATION_KEY) : null;
    if (stored) {
      const found = LOCATIONS.find((l) => l.id === stored);
      if (found) setLocationState(found);
    }

    // Subscribe FIRST, then fetch session.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    return { error: error?.message };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const setLocation = useCallback((loc: Location) => {
    setLocationState(loc);
    if (typeof window !== "undefined") localStorage.setItem(LOCATION_KEY, loc.id);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      session,
      loading,
      location,
      signIn,
      signUp,
      signOut,
      setLocation,
      needsLocation: !!user && !location,
    }),
    [user, session, loading, location, signIn, signUp, signOut, setLocation],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
