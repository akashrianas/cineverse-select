import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOVIES } from "@/data/mockMovies";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = query.trim().length > 0
    ? MOVIES.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.genre.toLowerCase().includes(query.toLowerCase()) ||
        m.director.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/10 transition text-muted-foreground hover:text-foreground"
        aria-label="Search movies"
      >
        {open ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, width: 200 }}
            animate={{ opacity: 1, y: 0, width: 320 }}
            exit={{ opacity: 0, y: -8, width: 200 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-10 z-50"
          >
            <div className="glass-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, genres, directors…"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") { setOpen(false); setQuery(""); }
                  }}
                />
              </div>

              {results.length > 0 && (
                <div className="max-h-72 overflow-y-auto">
                  {results.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                        navigate({ to: "/movie/$movieId", params: { movieId: m.id } });
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition text-left"
                    >
                      <img
                        src={m.posterUrl}
                        alt=""
                        className="w-10 h-14 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.genre} · {m.duration} · ⭐ {m.rating}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {query.trim().length > 0 && results.length === 0 && (
                <p className="text-xs text-muted-foreground px-3 py-4 text-center">
                  No movies found for "{query}"
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
