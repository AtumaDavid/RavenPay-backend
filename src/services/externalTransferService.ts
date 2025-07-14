import axios from 'axios';
import db from '../models/db';
import { Transaction } from '../types';

export const sendToExternalBank = async (
  userId: number,
  recipientAccount: string,
  recipientBankCode: string,
  amount: number,
  reference: string,
  accountName: string
): Promise<Transaction> => {
  try {
    if (amount <= 0) throw new Error('Amount must be positive');

    // Fetch sender's account
    const account = await db('accounts').where({ user_id: userId }).first();
    if (!account) throw new Error('Account not found');
    if (account.balance < amount) throw new Error('Insufficient balance');

    // Raven Atlas API configuration
    const apiKey = process.env.ATLAS_API_KEY;
    const apiUrl = process.env.ATLAS_BASE_URL;
    if (!apiKey || !apiUrl)
      throw new Error('Raven Atlas API credentials not configured');

    const payload = {
      amount: amount.toString(),
      bank_code: recipientBankCode,
      bank: recipientBankCode === '044' ? 'Access bank' : 'Unknown',
      account_number: recipientAccount,
      account_name: accountName,
      narration: 'Transfer',
      reference: reference,
      currency: 'NGN',
    };

    const response = await axios.post(`${apiUrl}/transfers/create`, payload, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (response.data.status !== 'success')
      throw new Error(
        `External transfer failed: ${response.data.message || 'Unknown error'}`
      );

    // update local account balance
    await db('accounts')
      .where({ id: account.id })
      .update({
        balance: db.raw(`balance - ${amount}`),
        updated_at: new Date(),
      });

    // Log the transaction locally
    const [transaction] = await db('transactions')
      .insert({
        user_id: userId,
        account_id: account.id,
        type: 'transfer',
        amount,
        recipient_account: recipientAccount,
        recipient_bank: payload.bank,
        status: 'completed',
        reference,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return transaction;
  } catch (error: any) {
    throw new Error(`External transfer failed: ${error.message}`);
  }
};
