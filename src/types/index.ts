export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Account {
  id: number;
  user_id: number;
  account_number: string;
  bank_name: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  id: number;
  user_id: number;
  account_id: number;
  type: 'deposit' | 'transfer';
  amount: number;
  recipient_account: string | null;
  recipient_bank: string | null;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  created_at: Date;
  updated_at: Date;
}

export interface WebhookLog {
  id: number;
  payload: any;
  transaction_id: number | null;
  created_at: Date;
}
