import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 3) {
      return [...Array(totalPages).keys()].map(n => n + 1);
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <HStack spacing={4} mt={6}>
      <Button onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
        Previous
      </Button>
      {visiblePages.map(page => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          colorScheme={page === currentPage ? 'teal' : 'gray'}
        >
          {page}
        </Button>
      ))}
      <Button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
