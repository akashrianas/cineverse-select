import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Film, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: Props) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn = tab === "login" ? signIn : signUp;
    const { error: err } = await fn(email, password);
    setBusy(false);
    if (err) setError(err);
    else onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary">
            <Film className="h-5 w-5" />
            <span className="font-display text-2xl tracking-widest">CINEVAULT</span>
          </div>
          <DialogTitle className="font-display text-3xl text-foreground">
            {tab === "login" ? "Welcome Back" : "Join the Vault"}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value={tab} className="mt-4">
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10"
                  placeholder="you@cinevault.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-md p-2">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={busy}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[var(--shadow-glow-amber)]"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : tab === "login" ? (
                  "Enter the Vault"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
