import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected(),
  });
  const { disconnect } = useDisconnect();

  return {
    address,
    isConnected,
    connect: () => connect(),
    disconnect: () => disconnect(),
  };
};