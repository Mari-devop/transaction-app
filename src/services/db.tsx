import Dexie from 'dexie';

export interface Transaction {
  id?: number;
  status: string;
  type: string;
  clientname: string;
  amount: number;
}

export class TransactionDB extends Dexie {
  public transactions: Dexie.Table<Transaction, number>;

  public constructor() {
    super('TransactionDB');
    this.version(1).stores({
      transactions: '++id, status, type, clientname, amount'
    });
    this.transactions = this.table('transactions');
  }
}

export const db = new TransactionDB();

export const addTransaction = (transaction: Transaction) => db.transactions.add(transaction);
export const getTransactions = () => db.transactions.toArray();
export const updateTransaction = (id: number, changes: Partial<Transaction>) => db.transactions.update(id, changes);
export const deleteTransaction = (id: number) => db.transactions.delete(id);
export const deleteAllTransactions = () => db.transactions.clear();
