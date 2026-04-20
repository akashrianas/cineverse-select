export type MovieStatus = "now_showing" | "advance" | "coming_soon";

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  rating: number;
  duration: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  status: MovieStatus;
  price: { standard: number; premium: number; balcony: number };
  showtimes: string[];
  releaseDate: string;
  /** Cities (matches LOCATIONS ids) where this movie is screening. */
  cities: string[];
}

const today = new Date();
const fmt = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const addDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return fmt(d);
};

const SHOWTIMES = ["10:30 AM", "1:45 PM", "5:00 PM", "8:30 PM", "11:00 PM"];
const PRICE = { standard: 12, premium: 18, balcony: 22 };

export const MOVIES: Movie[] = [
  {
    id: "dune-3",
    title: "Dune: Messiah",
    tagline: "The prophecy has only just begun.",
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 46m",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/87OPoUiBQpA9DQdIWFVDvOdmcoz.jpg",
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london"],
  },
  {
    id: "oppenheimer-2",
    title: "Atomic Dawn",
    tagline: "History rewritten in fire.",
    genre: "Drama",
    rating: 8.4,
    duration: "3h 00m",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "newyork", "london", "tokyo"],
  },
  {
    id: "blade-runner-3",
    title: "Blade Runner 2099",
    tagline: "More human than human, again.",
    genre: "Sci-Fi",
    rating: 8.1,
    duration: "2h 28m",
    posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "bengaluru", "tokyo", "newyork"],
  },
  {
    id: "interstellar-2",
    title: "Beyond Gargantua",
    tagline: "Love transcends dimensions.",
    genre: "Sci-Fi",
    rating: 9.0,
    duration: "2h 49m",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    trailerUrl: "#",
    status: "advance",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(7),
    cities: ["mumbai", "delhi", "london", "newyork"],
  },
  {
    id: "joker-3",
    title: "Joker: Carnival",
    tagline: "Smile. The world is a stage.",
    genre: "Crime",
    rating: 7.9,
    duration: "2h 18m",
    posterUrl: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    trailerUrl: "#",
    status: "advance",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(10),
    cities: ["delhi", "bengaluru", "newyork", "london"],
  },
  {
    id: "avatar-4",
    title: "Avatar: Tides of Pandora",
    tagline: "Return to a world reborn.",
    genre: "Adventure",
    rating: 8.2,
    duration: "3h 10m",
    posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    trailerUrl: "#",
    status: "coming_soon",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(30),
    cities: ["mumbai", "delhi", "bengaluru", "tokyo", "london", "newyork"],
  },
  {
    id: "matrix-5",
    title: "Matrix: Genesis",
    tagline: "There is no spoon. There never was.",
    genre: "Action",
    rating: 8.0,
    duration: "2h 22m",
    posterUrl: "https://image.tmdb.org/t/p/w500/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/zxrBL2OuDGWxYUwSIaqTPYVu0Ed.jpg",
    trailerUrl: "#",
    status: "coming_soon",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(45),
    cities: ["tokyo", "newyork", "london"],
  },
  {
    id: "spider-verse-3",
    title: "Spider-Verse: Beyond",
    tagline: "Every universe. One web.",
    genre: "Animation",
    rating: 8.9,
    duration: "2h 20m",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "bengaluru", "delhi", "tokyo", "newyork", "london"],
  },
];

export const FEATURED_MOVIE = MOVIES[0];
