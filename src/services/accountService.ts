import db from '../models/db';
import { Account, Transaction } from '../types';

export const generateAccount = async (userId: number): Promise<Account> => {
  try {
    let accountNumber: string = '';
    let isUnique = false;

    // generate account number
    while (!isUnique) {
      const randomNum = Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString(); // 10-digit number
      accountNumber = `${randomNum}`;
      const existingAccount = await db('accounts')
        .where({ account_number: accountNumber })
        .first();
      isUnique = !existingAccount;
    }

    const bankName = 'RavenPay Bank';

    const [account] = await db('accounts')
      .insert({
        user_id: userId,
        account_number: accountNumber,
        bank_name: bankName,
        balance: 0.0,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return account;
  } catch (error: any) {
    throw new Error(`Failed to generate account: ${error.message}`);
  }
};

export const getAccountDetails = async (userId: number): Promise<Account> => {
  try {
    const account = await db('accounts').where({ user_id: userId }).first();
    if (!account) throw new Error('Account not found');
    return account;
  } catch (error: any) {
    throw new Error(`Failed to fetch account: ${error.message}`);
  }
};

export const getTransactionHistory = async (
  userId: number
): Promise<Transaction[]> => {
  try {
    const account = await db('accounts').where({ user_id: userId }).first();
    if (!account) throw new Error('Account not found');
    const transactions = await db('transactions')
      .where({ user_id: userId })
      .orWhere({ account_id: account.id });
    return transactions;
  } catch (error: any) {
    throw new Error(`Failed to fetch transaction history: ${error.message}`);
  }
};
