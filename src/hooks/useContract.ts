import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../config/constants';
import EventVerseABI from '../contracts/abi/EventVerse.json';

export const useContract = () => {
  const getContract = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, EventVerseABI.abi, signer);
  };

  return { getContract };
};