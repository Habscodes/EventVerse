import { createConfig, http } from 'wagmi';
import { arbitrum } from 'viem/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const config = createConfig({
  chains: [arbitrum],
  connectors: [injected()],
  transports: {
    [arbitrum.id]: http(),
  },
});