import React from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';

interface EventFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({ onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="search"
          placeholder="Search events..."
          onChange={handleChange}
          className="pl-10 w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="pl-10 w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="pl-10 w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>
    </div>
  );
};