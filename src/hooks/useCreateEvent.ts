import { useState } from 'react';
import { useContract } from './useContract';
import { ethers } from 'ethers';

export const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const { getContract } = useContract();

  const createEvent = async (eventData: {
    title: string;
    description: string;
    date: string;
    location: string;
    price: string;
    imageUrl: string;
    ticketsAvailable: number;
  }) => {
    setLoading(true);
    try {
      const contract = await getContract();
      const timestamp = Math.floor(new Date(eventData.date).getTime() / 1000);
      const priceInWei = ethers.parseEther(eventData.price);

      const tx = await contract.createEvent(
        eventData.title,
        eventData.description,
        timestamp,
        eventData.location,
        priceInWei,
        eventData.imageUrl,
        eventData.ticketsAvailable
      );

      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading };
};