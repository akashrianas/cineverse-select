CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id TEXT NOT NULL,
  movie_title TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  city TEXT NOT NULL,
  hall TEXT NOT NULL,
  show_date TEXT NOT NULL,
  showtime TEXT NOT NULL,
  seats TEXT[] NOT NULL,
  seat_tier_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  subtotal NUMERIC(10,2) NOT NULL,
  fee NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  ticket_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings"
  ON public.bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings"
  ON public.bookings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX bookings_user_id_idx ON public.bookings(user_id);
CREATE INDEX bookings_created_at_idx ON public.bookings(created_at DESC);