export interface Location {
  id: string;
  city: string;
  country: string;
  halls: number;
  emoji: string;
}

export const LOCATIONS: Location[] = [
  { id: "mumbai", city: "Mumbai", country: "India", halls: 14, emoji: "🌊" },
  { id: "delhi", city: "Delhi", country: "India", halls: 11, emoji: "🏛️" },
  { id: "bengaluru", city: "Bengaluru", country: "India", halls: 9, emoji: "🌳" },
  { id: "newyork", city: "New York", country: "USA", halls: 22, emoji: "🗽" },
  { id: "london", city: "London", country: "UK", halls: 17, emoji: "🎡" },
  { id: "tokyo", city: "Tokyo", country: "Japan", halls: 19, emoji: "🗼" },
];
