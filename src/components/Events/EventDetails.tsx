import React from 'react';
import { Calendar, MapPin, Ticket, User } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { useContract } from '../../hooks/useContract';
import { ethers } from 'ethers';

interface EventDetailsProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  imageUrl: string;
  organizer: string;
  ticketsAvailable: number;
  onClose: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  id,
  title,
  description,
  date,
  location,
  price,
  imageUrl,
  organizer,
  ticketsAvailable,
  onClose,
}) => {
  const { isConnected, address } = useWallet();
  const { getContract } = useContract();

  const purchaseTicket = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const contract = await getContract();
      const tx = await contract.purchaseTicket(id, {
        value: ethers.parseEther(price)
      });
      await tx.wait();
      alert('Ticket purchased successfully!');
      onClose();
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      alert('Failed to purchase ticket');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3" />
              <span>{new Date(date).toLocaleString()}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3" />
              <span>{location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Ticket className="h-5 w-5 mr-3" />
              <span>{ticketsAvailable} tickets available</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <User className="h-5 w-5 mr-3" />
              <span>Organized by: {organizer.slice(0, 6)}...{organizer.slice(-4)}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-purple-600">{price} ETH</div>
            <div className="space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={purchaseTicket}
                disabled={!isConnected || ticketsAvailable === 0}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
              >
                {!isConnected ? 'Connect Wallet' : 'Purchase Ticket'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};