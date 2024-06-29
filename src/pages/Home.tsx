import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { deleteAllTransactions, Transaction } from '../services/db';
import TransactionTable from '../components/Table/TransactionTable';
import TransactionButtons from '../components/Buttons/TransactionButtons';
import TransactionFilter from '../components/Filter/TransactionFilter';
import Pagination from '../components/Pagination/TablePagination';
import Navbar from '../components/Navbar/Navbar';
import { ContentContainer, FilterAndButtons, Container } from './Home.styled';
import { Box, AbsoluteCenter } from '@chakra-ui/react';

export const Home = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const queryClient = useQueryClient();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); 
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(event.target.value);
    setCurrentPage(1); 
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const clearTransactions = async () => {
    await deleteAllTransactions();
    setTransactions([]);
    queryClient.invalidateQueries('transactions');
  };

  return (
    <Container>
      <Navbar />
      <Box>
        <AbsoluteCenter axis="horizontal">
          <ContentContainer>
            <FilterAndButtons>
              <TransactionFilter
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                onStatusChange={handleStatusChange}
                onTypeChange={handleTypeChange}
              />
              <TransactionButtons 
                transactions={transactions} 
                clearTransactions={clearTransactions} 
              />
            </FilterAndButtons>
            <TransactionTable
              statusFilter={statusFilter}
              typeFilter={typeFilter}
              searchQuery={searchQuery}
              currentPage={currentPage}
              transactionsPerPage={6}
              setTotalPages={setTotalPages}
              setCurrentPage={setCurrentPage}
              setTransactions={setTransactions}
              onSearchChange={handleSearchChange}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </ContentContainer>
        </AbsoluteCenter>
      </Box>
    </Container>
  );
};
