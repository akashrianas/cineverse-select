export type MovieStatus = "now_showing" | "advance" | "coming_soon";

export interface CastMember {
  name: string;
  role: string;
  photoUrl: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  genre: string;
  genres: string[];
  rating: number;
  duration: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerEmbedUrl: string;
  status: MovieStatus;
  price: { standard: number; premium: number; balcony: number };
  showtimes: string[];
  releaseDate: string;
  cities: string[];
  director: string;
  cast: CastMember[];
  certificate: string;
  languages: string[];
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

// TMDB image CDN — stable, high-quality official posters/backdrops.
const tmdb = (size: "w500" | "w780" | "original", path: string) =>
  `https://image.tmdb.org/t/p/${size}${path}`;
// Unsplash portrait for cast placeholders.
const person = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&h=200&q=80`;

export const MOVIES: Movie[] = [
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    synopsis:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. A sweeping, terrifying portrait of the man behind the Manhattan Project.",
    genre: "Drama",
    genres: ["Drama", "History", "Thriller"],
    rating: 8.3,
    duration: "3h 00m",
    posterUrl: tmdb("w500", "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"),
    backdropUrl: tmdb("original", "/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg"),
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    trailerEmbedUrl: "https://www.youtube.com/embed/uYPbbksJxIg",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london", "tokyo"],
    director: "Christopher Nolan",
    cast: [
      { name: "Cillian Murphy", role: "J. Robert Oppenheimer", photoUrl: person("1500648767791-00dcc994a43e") },
      { name: "Emily Blunt", role: "Kitty Oppenheimer", photoUrl: person("1544005313-94ddf0286df2") },
      { name: "Matt Damon", role: "Leslie Groves", photoUrl: person("1506794778202-cad84cf45f1d") },
      { name: "Robert Downey Jr.", role: "Lewis Strauss", photoUrl: person("1492562080023-ab3db95bfbce") },
    ],
    certificate: "R",
    languages: ["English", "Hindi"],
  },
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    tagline: "Why so serious?",
    synopsis:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    duration: "2h 32m",
    posterUrl: tmdb("w500", "/qJ2tW6WMUDux911r6m7haRef0WH.jpg"),
    backdropUrl: tmdb("original", "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg"),
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    trailerEmbedUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london", "tokyo"],
    director: "Christopher Nolan",
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne / Batman", photoUrl: person("1507003211169-0a1dd7228f2d") },
      { name: "Heath Ledger", role: "The Joker", photoUrl: person("1463453091185-61582044d556") },
      { name: "Aaron Eckhart", role: "Harvey Dent", photoUrl: person("1519085360753-af0119f7cbe7") },
      { name: "Gary Oldman", role: "James Gordon", photoUrl: person("1480455624313-e29b44bbfde1") },
    ],
    certificate: "PG-13",
    languages: ["English"],
  },
  {
    id: "avatar-way-of-water",
    title: "Avatar: The Way of Water",
    tagline: "Return to Pandora.",
    synopsis:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Adventure", "Action"],
    rating: 7.6,
    duration: "3h 12m",
    posterUrl: tmdb("w500", "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"),
    backdropUrl: tmdb("original", "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg"),
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0",
    trailerEmbedUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london", "tokyo"],
    director: "James Cameron",
    cast: [
      { name: "Sam Worthington", role: "Jake Sully", photoUrl: person("1531427186611-ecfd6d936c79") },
      { name: "Zoe Saldana", role: "Neytiri", photoUrl: person("1534528741775-53994a69daeb") },
      { name: "Sigourney Weaver", role: "Kiri", photoUrl: person("1573496359142-b8d87734a5a2") },
      { name: "Stephen Lang", role: "Col. Quaritch", photoUrl: person("1566492031773-4f4e44671857") },
    ],
    certificate: "PG-13",
    languages: ["English", "Hindi", "Tamil"],
  },
  {
    id: "spider-man-no-way-home",
    title: "Spider-Man: No Way Home",
    tagline: "The Multiverse unleashed.",
    synopsis:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    genre: "Action",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.2,
    duration: "2h 28m",
    posterUrl: tmdb("w500", "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"),
    backdropUrl: tmdb("original", "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg"),
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    trailerEmbedUrl: "https://www.youtube.com/embed/JfVOs4VSpmA",
    status: "now_showing",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(0),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london", "tokyo"],
    director: "Jon Watts",
    cast: [
      { name: "Tom Holland", role: "Peter Parker", photoUrl: person("1504593811423-6dd665756598") },
      { name: "Zendaya", role: "MJ", photoUrl: person("1488426862026-3ee34a7d66df") },
      { name: "Benedict Cumberbatch", role: "Doctor Strange", photoUrl: person("1492562080023-ab3db95bfbce") },
      { name: "Willem Dafoe", role: "Green Goblin", photoUrl: person("1552058544-f2b08422138a") },
    ],
    certificate: "PG-13",
    languages: ["English", "Hindi"],
  },
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    synopsis:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he must prevent a terrible future only he can foresee.",
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.5,
    duration: "2h 46m",
    posterUrl: tmdb("w500", "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"),
    backdropUrl: tmdb("original", "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg"),
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    trailerEmbedUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    status: "advance",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(7),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london"],
    director: "Denis Villeneuve",
    cast: [
      { name: "Timothée Chalamet", role: "Paul Atreides", photoUrl: person("1463453091185-61582044d556") },
      { name: "Zendaya", role: "Chani", photoUrl: person("1488426862026-3ee34a7d66df") },
      { name: "Rebecca Ferguson", role: "Lady Jessica", photoUrl: person("1544005313-94ddf0286df2") },
      { name: "Javier Bardem", role: "Stilgar", photoUrl: person("1566492031773-4f4e44671857") },
    ],
    certificate: "PG-13",
    languages: ["English"],
  },
  {
    id: "doomsday",
    title: "Avengers: Doomsday",
    tagline: "The final reckoning.",
    synopsis:
      "Earth's mightiest heroes reassemble to face Doctor Doom — an enemy unlike any they have known. Cataclysmic stakes, crumbling timelines, and one last stand for the multiverse.",
    genre: "Action",
    genres: ["Action", "Sci-Fi", "Adventure"],
    rating: 8.7,
    duration: "2h 55m",
    posterUrl: tmdb("w500", "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg"),
    backdropUrl: tmdb("original", "/rMvPXy8PUjj1o8o1pzgQbdNCsvj.jpg"),
    trailerUrl: "#",
    trailerEmbedUrl: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    status: "advance",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(14),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london", "tokyo"],
    director: "Russo Brothers",
    cast: [
      { name: "Robert Downey Jr.", role: "Victor Von Doom", photoUrl: person("1492562080023-ab3db95bfbce") },
      { name: "Chris Hemsworth", role: "Thor", photoUrl: person("1519085360753-af0119f7cbe7") },
      { name: "Tom Hiddleston", role: "Loki", photoUrl: person("1507003211169-0a1dd7228f2d") },
      { name: "Anthony Mackie", role: "Captain America", photoUrl: person("1506794778202-cad84cf45f1d") },
    ],
    certificate: "PG-13",
    languages: ["English", "Hindi"],
  },
  {
    id: "the-odyssey",
    title: "The Odyssey",
    tagline: "A legend returns home.",
    synopsis:
      "Christopher Nolan's epic reimagining of Homer's timeless tale. Odysseus battles gods, monsters, and his own demons on a treacherous ten-year voyage back to Ithaca.",
    genre: "Adventure",
    genres: ["Adventure", "Drama", "Fantasy"],
    rating: 8.9,
    duration: "2h 50m",
    posterUrl: tmdb("w500", "/nBeuNFkL7rYnoRjyy3rI0sDqhxr.jpg"),
    backdropUrl: tmdb("original", "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg"),
    trailerUrl: "#",
    trailerEmbedUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    status: "coming_soon",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(45),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london", "tokyo"],
    director: "Christopher Nolan",
    cast: [
      { name: "Matt Damon", role: "Odysseus", photoUrl: person("1506794778202-cad84cf45f1d") },
      { name: "Anne Hathaway", role: "Penelope", photoUrl: person("1534528741775-53994a69daeb") },
      { name: "Tom Holland", role: "Telemachus", photoUrl: person("1504593811423-6dd665756598") },
      { name: "Robert Pattinson", role: "Hermes", photoUrl: person("1463453091185-61582044d556") },
    ],
    certificate: "PG-13",
    languages: ["English"],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    synopsis:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    rating: 8.7,
    duration: "2h 49m",
    posterUrl: tmdb("w500", "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"),
    backdropUrl: tmdb("original", "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"),
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    trailerEmbedUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    status: "coming_soon",
    price: PRICE,
    showtimes: SHOWTIMES,
    releaseDate: addDays(30),
    cities: ["mumbai", "delhi", "bengaluru", "newyork", "london", "tokyo"],
    director: "Christopher Nolan",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper", photoUrl: person("1519085360753-af0119f7cbe7") },
      { name: "Anne Hathaway", role: "Brand", photoUrl: person("1534528741775-53994a69daeb") },
      { name: "Jessica Chastain", role: "Murph", photoUrl: person("1573496359142-b8d87734a5a2") },
      { name: "Michael Caine", role: "Professor Brand", photoUrl: person("1480455624313-e29b44bbfde1") },
    ],
    certificate: "PG-13",
    languages: ["English"],
  },
];

/** Featured rotation for the hero slider — picks the visually strongest titles. */
export const FEATURED_MOVIES: Movie[] = [
  MOVIES[0], // Oppenheimer
  MOVIES[1], // Dark Knight
  MOVIES[3], // Spider-Man
  MOVIES[2], // Avatar
];
