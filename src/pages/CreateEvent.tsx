import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EventForm } from '../components/Forms/EventForm';
import { useWallet } from '../hooks/useWallet';
import { useCreateEvent } from '../hooks/useCreateEvent';

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { createEvent, loading } = useCreateEvent();

  const handleSubmit = async (eventData: any) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    try {
      await createEvent(eventData);
      alert('Event created successfully!');
      navigate('/events');
    } catch (error) {
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
      {!isConnected ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Please connect your wallet to create an event</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <EventForm onSubmit={handleSubmit} loading={loading} />
        </div>
      )}
    </div>
  );
};