import { useState, useEffect } from 'react';
import { useContract } from './useContract';

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

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { getContract } = useContract();

  const fetchEvents = async () => {
    try {
      const contract = await getContract();
      const eventCount = await contract.getEventCount();
      const fetchedEvents = [];

      for (let i = 0; i < eventCount; i++) {
        const event = await contract.events(i);
        fetchedEvents.push({
          id: event.id.toString(),
          title: event.title,
          description: event.description,
          date: new Date(event.date * 1000).toISOString(),
          location: event.location,
          price: ethers.formatEther(event.price),
          imageUrl: event.imageUrl,
          organizer: event.organizer,
          ticketsAvailable: event.ticketsAvailable.toNumber(),
        });
      }

      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, refreshEvents: fetchEvents };
};