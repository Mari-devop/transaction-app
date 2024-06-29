import { Transaction } from "../../services/db";

export interface RawTransaction {
    TransactionId: string;
    Status: string;
    Type: string;
    ClientName: string;
    Amount: string;
}
  
export interface TransactionButtonsProps {
    transactions: Transaction[];
    clearTransactions: () => Promise<void>;
}