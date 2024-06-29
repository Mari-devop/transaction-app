import React, { useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useDeleteTransaction, useUpdateTransaction } from '../../hooks/useTransactionMutations';
import { TransactionTableProps } from './types';
import { Table, Thead, Tbody, Tr, Th, Td, Button, VStack, Box } from '@chakra-ui/react';
import TransactionSearch from '../Search/TransactionSearch';
import Modal from '../Modal/Modal';
import { ButtonContainer } from './TransactionTable.styled';

const TransactionTable: React.FC<TransactionTableProps> = ({
  statusFilter,
  typeFilter,
  searchQuery,
  currentPage,
  transactionsPerPage,
  setTotalPages,
  setTransactions,
  onSearchChange,
}) => {
  const { data: transactions, isLoading, error } = useTransactions();
  const deleteTransaction = useDeleteTransaction();
  const updateTransaction = useUpdateTransaction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const filteredTransactions = transactions
      ?.filter((transaction) =>
        (statusFilter ? transaction.status.toLowerCase() === statusFilter.toLowerCase() : true) &&
        (typeFilter ? transaction.type.toLowerCase() === typeFilter.toLowerCase() : true) &&
        (searchQuery
          ? transaction.clientname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.amount.toString().includes(searchQuery)
          : true)
      ) || [];

    setTransactions(filteredTransactions);
    setTotalPages(Math.ceil(filteredTransactions.length / transactionsPerPage));
  }, [transactions, searchQuery, statusFilter, typeFilter, transactionsPerPage, setTotalPages, setTransactions]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  const handleEditClick = (id: number, status: string) => {
    setSelectedTransaction(id);
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setNewStatus('');
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateTransaction = () => {
    if (selectedTransaction !== null && newStatus) {
      updateTransaction.mutate({ id: selectedTransaction, changes: { status: newStatus } });
      handleModalClose();
    }
  };

  const filteredTransactions = transactions
    ?.filter((transaction) =>
      (statusFilter ? transaction.status.toLowerCase() === statusFilter.toLowerCase() : true) &&
      (typeFilter ? transaction.type.toLowerCase() === typeFilter.toLowerCase() : true) &&
      (searchQuery
        ? transaction.clientname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.amount.toString().includes(searchQuery)
        : true)
    ) || [];

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <VStack spacing={4} width="100%" alignItems="center">
      <TransactionSearch value={searchQuery} onChange={onSearchChange} />
      <Box width="100%" maxW="1200px" overflowX="auto">
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>TransactionId</Th>
              <Th>Status</Th>
              <Th>Type</Th>
              <Th>ClientName</Th>
              <Th>Amount</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentTransactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.id}</Td>
                <Td>{transaction.status}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.clientname}</Td>
                <Td>{transaction.amount}</Td>
                <Td>
                  <ButtonContainer>
                    <Button onClick={() => handleEditClick(transaction.id!, transaction.status)}>Edit</Button>
                    <Button onClick={() => {
                      if (typeof transaction.id === 'number') {
                        deleteTransaction.mutate(transaction.id);
                      }
                    }}>Delete</Button>
                  </ButtonContainer>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdate={handleUpdateTransaction}
        newStatus={newStatus}
        handleStatusChange={handleStatusChange}
      />
    </VStack>
  );
};

export default TransactionTable;
