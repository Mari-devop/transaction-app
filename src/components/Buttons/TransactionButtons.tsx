import React, { useRef } from 'react';
import Papa, { ParseResult } from 'papaparse';
import { useQueryClient } from 'react-query';
import { addTransaction, Transaction } from '../../services/db';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { TransactionButtonsProps, RawTransaction } from './types';

const TransactionButtons: React.FC<TransactionButtonsProps> = ({ transactions, clearTransactions }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  const normalizeKeys = (obj: RawTransaction): Transaction => {
    const amount = parseFloat(obj.Amount.replace(/[^0-9.-]+/g, ''));
    return {
      id: parseInt(obj.TransactionId, 10),
      status: obj.Status,
      type: obj.Type,
      clientname: obj.ClientName,
      amount: isNaN(amount) ? 0 : amount, 
    };
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<RawTransaction>(file, {
        header: true,
        complete: async (results: ParseResult<RawTransaction>) => {
          console.log('Parsed Results:', results.data);
          const transactions = results.data.map(normalizeKeys);
          for (const transaction of transactions) {
            if (transaction.status && transaction.type && transaction.clientname && transaction.amount >= 0) {
              await addTransaction(transaction);
            } else {
              console.error('Invalid Transaction:', transaction);
              toast({
                title: 'Invalid CSV format',
                description: 'Please check the CSV file format and try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
              return;
            }
          }
        toast({
          title: 'Import successful',
          description: 'Transactions have been successfully imported.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
          queryClient.invalidateQueries('transactions');
          },
        error: (error) => {
          console.error('Parsing Error:', error);
          toast({
            title: 'Error parsing CSV',
            description: 'There was an error parsing the CSV file. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      });
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleExportClick = () => {
    const csvData = Papa.unparse(transactions);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    clearTransactions();
  };

  return (
    <Stack spacing={4} direction='row' align='center'>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept='.csv'
      />
      <Button colorScheme='teal' size='md' onClick={handleImportClick}>
        Import
      </Button>
      <Button colorScheme='teal' size='md' onClick={handleExportClick}>
        Export
      </Button>
    </Stack>
  );
};

export default TransactionButtons;
