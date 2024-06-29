import React from 'react';
import { SearchInputProps } from './types';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const TransactionSearch: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search transactions"
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
};

export default TransactionSearch;
