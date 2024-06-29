import { useQuery } from 'react-query';
import { getTransactions } from '../services/db';

export const useTransactions = () => {
  return useQuery('transactions', getTransactions, {
    refetchOnWindowFocus: true, 
  });
};
