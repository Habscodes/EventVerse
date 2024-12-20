export const formatAddress = (address: string | undefined): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleString();
};

export const formatEthPrice = (price: string): string => {
  return `${price} ETH`;
};