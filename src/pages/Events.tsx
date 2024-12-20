import React, { useState, useMemo } from 'react';
import { EventCard } from '../components/Events/EventCard';
import { EventFilters } from '../components/Events/EventFilters';
import { useEvents } from '../hooks/useEvents';
import { Loader } from 'lucide-react';

export const Events = () => {
  const { events, loading } = useEvents();
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    location: '',
  });

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesDate = !filters.date || event.date.includes(filters.date);
      const matchesLocation = !filters.location ||
        event.location.toLowerCase().includes(filters.location.toLowerCase());
      
      return matchesSearch && matchesDate && matchesLocation;
    });
  }, [events, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Events</h1>
      
      <EventFilters onFilterChange={(newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
      }} />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No events found matching your criteria
            </div>
          )}
        </div>
      )}
    </div>
  );
};