import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { formatAddress } from '../../utils/formatters';

export const WalletButton = () => {
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <button
      onClick={() => isConnected ? disconnect() : connect()}
      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
    >
      <Wallet className="h-5 w-5" />
      <span>
        {isConnected ? formatAddress(address) : 'Connect Wallet'}
      </span>
    </button>
  );
};