import React from 'react';

// Rest of the code...
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EventCard } from '../components/Events/EventCard';

export const Home = () => {
  const featuredEvents = [
      {
        "title": "Web3 Developer Summit 2024",
        "date": "June 15, 2024",
        "location": "Virtual",
        "price": "0.1 ETH",
        "image": "https://plus.unsplash.com/premium_photo-1724753996058-6f46e8e77f0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3Dhttps://images.unsplash.com/photo-1655811663985-62d6d594f5f6"
      },
      {
        "title": "NFT Art Exhibition",
        "date": "July 1, 2024",
        "location": "Lagos, Nigeria",
        "price": "0.05 ETH",
        "image": "https://images.unsplash.com/photo-1600320271815-fd1edc51650b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2glMjBjb25mZXJlbmNlfGVufDB8fDB8fHww"
      },
      {
        "title": "Blockchain Conference 2024",
        "date": "August 10, 2024",
        "location": "New York, USA",
        "price": "0.2 ETH",
        "image": "https://images.unsplash.com/photo-1582192493926-93f4847e1323?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlY2glMjBjb25mZXJlbmNlfGVufDB8fDB8fHww"
      },
      {
        "title": "DeFi Summit 2024",
        "date": "September 20, 2024",
        "location": "London, UK",
        "price": "0.15 ETH",
        "image": "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2glMjBjb25mZXJlbmNlfGVufDB8fDB8fHww"
      },
      {
        "title": "Tech Conference",
        "date": "October 5, 2024",
        "location": "Lagos, Nigeria",
        "price": "0.1 ETH",
        "image": "https://images.unsplash.com/photo-1600320844678-43cebba1cdfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2glMjBjb25mZXJlbmNlfGVufDB8fDB8fHww"
      },
      // {
      //   "title": "AI Workshop",
      //   "date": "November 15, 2024",
      //   "location": "Lagos, Nigeria",
      //   "price": "0.08 ETH",
      //   "image": "https://images.unsplash.com/photo-1581092580017-453fc9a6c234"
      // },
      // {
      //   "title": "JavaScript Conference",
      //   "date": "December 1, 2024",
      //   "location": "San Francisco, USA",
      //   "price": "0.12 ETH",
      //   "image": "https://images.unsplash.com/photo-1614019980591-56a4cda4e877"
      // },
      // {
      //   "title": "React Summit",
      //   "date": "January 15, 2025",
      //   "location": "Amsterdam, Netherlands",
      //   "price": "0.1 ETH",
      //   "image": "https://images.unsplash.com/photo-1604094112706-f8fc5b0cd524"
      // }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative bg-purple-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">
              Decentralized Event Ticketing on Arbitrum
            </h1>
            <p className="text-xl mb-8 text-purple-200">
              Create, manage, and participate in events with NFT-based tickets
            </p>
            <div className="flex space-x-4">
              <Link
                to="/create"
                className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100"
              >
                Create Event
              </Link>
              <Link
                to="/events"
                className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
            <Link
              to="/events"
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              View all events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    );
};
