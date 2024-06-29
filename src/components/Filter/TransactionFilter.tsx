import React from 'react';
import { Select } from '@chakra-ui/react';
import { FilterContainer } from './TransactionFilter.styled';

interface TransactionFilterProps {
  statusFilter: string;
  typeFilter: string;
  onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ statusFilter, typeFilter, onStatusChange, onTypeChange }) => {
  return (
    <FilterContainer>
        <Select placeholder='Status' value={statusFilter} onChange={onStatusChange}>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
            <option value='cancelled'>Cancelled</option>
        </Select>
        <Select placeholder='Type' value={typeFilter} onChange={onTypeChange}>
            <option value='refill'>Refill</option>
            <option value='withdrawal'>Withdrawal</option>
        </Select>
    </FilterContainer>
  );
};

export default TransactionFilter;
