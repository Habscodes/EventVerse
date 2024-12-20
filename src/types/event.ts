export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  imageUrl: string;
  organizer: string;
  ticketsAvailable: number;
}

export interface EventFilters {
  search: string;
  date: string;
  location: string;
}