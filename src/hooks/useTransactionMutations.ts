import { useMutation, useQueryClient } from 'react-query';
import { updateTransaction, deleteTransaction, Transaction } from '../services/db';

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation((data: { id: number, changes: Partial<Transaction> }) => updateTransaction(data.id, data.changes), {
      onSuccess: () => {
        queryClient.invalidateQueries('transactions');
      }
    });
  };

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    }
  });
};
