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

// Verified Unsplash photo IDs — cinematic / sci-fi / cityscape themes.
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MOVIES: Movie[] = [
  {
    id: "dune-3",
    title: "Dune: Messiah",
    tagline: "The prophecy has only just begun.",
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 46m",
    posterUrl: img("1547700055-b61cacebece9", 600),
    backdropUrl: img("1542204165-65bf26472b9b", 1800),
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london"],
  },
  {
    id: "atomic-dawn",
    title: "Atomic Dawn",
    tagline: "History rewritten in fire.",
    genre: "Drama",
    rating: 8.4,
    duration: "3h 00m",
    posterUrl: img("1478720568477-152d9b164e26", 600),
    backdropUrl: img("1485846234645-a62644f84728", 1800),
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "newyork", "london", "tokyo"],
  },
  {
    id: "neon-runner",
    title: "Neon Runner 2099",
    tagline: "More human than human, again.",
    genre: "Sci-Fi",
    rating: 8.1,
    duration: "2h 28m",
    posterUrl: img("1574267432553-4b4628081c31", 600),
    backdropUrl: img("1517604931442-7e0c8ed2963c", 1800),
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "bengaluru", "tokyo", "newyork"],
  },
  {
    id: "beyond-gargantua",
    title: "Beyond Gargantua",
    tagline: "Love transcends dimensions.",
    genre: "Sci-Fi",
    rating: 9.0,
    duration: "2h 49m",
    posterUrl: img("1446776811953-b23d57bd21aa", 600),
    backdropUrl: img("1419242902214-272b3f66ee7a", 1800),
    trailerUrl: "#",
    status: "advance",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(7),
    cities: ["mumbai", "delhi", "london", "newyork"],
  },
  {
    id: "carnival",
    title: "Carnival of Shadows",
    tagline: "Smile. The world is a stage.",
    genre: "Crime",
    rating: 7.9,
    duration: "2h 18m",
    posterUrl: img("1518929458119-e5bf444c30f4", 600),
    backdropUrl: img("1489599849927-2ee91cede3ba", 1800),
    trailerUrl: "#",
    status: "advance",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(10),
    cities: ["delhi", "bengaluru", "newyork", "london"],
  },
  {
    id: "tides-of-pandora",
    title: "Tides of Pandora",
    tagline: "Return to a world reborn.",
    genre: "Adventure",
    rating: 8.2,
    duration: "3h 10m",
    posterUrl: img("1440404653325-ab127d49abc1", 600),
    backdropUrl: img("1440404653325-ab127d49abc1", 1800),
    trailerUrl: "#",
    status: "coming_soon",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(30),
    cities: ["mumbai", "delhi", "bengaluru", "tokyo", "london", "newyork"],
  },
  {
    id: "matrix-genesis",
    title: "Code: Genesis",
    tagline: "There is no spoon. There never was.",
    genre: "Action",
    rating: 8.0,
    duration: "2h 22m",
    posterUrl: img("1526374965328-7f61d4dc18c5", 600),
    backdropUrl: img("1526374965328-7f61d4dc18c5", 1800),
    trailerUrl: "#",
    status: "coming_soon",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(45),
    cities: ["tokyo", "newyork", "london"],
  },
  {
    id: "spider-beyond",
    title: "Web of Universes",
    tagline: "Every universe. One web.",
    genre: "Animation",
    rating: 8.9,
    duration: "2h 20m",
    posterUrl: img("1635805737707-575885ab0820", 600),
    backdropUrl: img("1626814026160-2237a95fc5a0", 1800),
    trailerUrl: "#",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "bengaluru", "delhi", "tokyo", "newyork", "london"],
  },
];

/** Featured rotation for the hero slider — picks the visually strongest titles. */
export const FEATURED_MOVIES: Movie[] = [
  MOVIES[0],
  MOVIES[1],
  MOVIES[2],
  MOVIES[7],
];
