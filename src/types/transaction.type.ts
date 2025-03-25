export interface TransactionBase {
  anotherPerson: string | null;
  description: string;
  amount: number;
  date: Date;
  pending: boolean;
  image: string;
}

export interface TransactionCredit extends TransactionBase {
  type: "credit";
  name: string;
}

export interface TransactionPayment extends TransactionBase {
  type: "payment";
  name: null;
}

export type Transaction = TransactionCredit | TransactionPayment;
export default Transaction;
