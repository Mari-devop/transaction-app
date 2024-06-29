import { Transaction } from "../../services/db";

export interface TransactionTableProps {
    statusFilter: string;
    typeFilter: string;
    searchQuery: string;
    currentPage: number;
    transactionsPerPage: number;
    setTotalPages: (total: number) => void;
    setCurrentPage: (page: number) => void;
    setTransactions: (transactions: Transaction[]) => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}