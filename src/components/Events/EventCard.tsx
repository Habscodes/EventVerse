import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
}

export const EventCard: React.FC<EventCardProps> = ({ title, date, location, price, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Ticket className="h-5 w-5 mr-2" />
            <span>{price}</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
          Get Tickets
        </button>
      </div>
    </div>
  );
};