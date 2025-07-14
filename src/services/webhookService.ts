import db from '../models/db';
// import { Transaction, WebhookLog } from '../types';

export const processDepositWebhook = async (payload: any): Promise<void> => {
  try {
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookSecret && payload.secret !== webhookSecret) {
      throw new Error('Invalid webhook signature');
    }

    const { account_number, amount, reference, status } = payload;
    if (!account_number || !amount || !reference || status !== 'completed') {
      throw new Error('Invalid webhook payload');
    }

    const account = await db('accounts').where({ account_number }).first();
    if (!account) throw new Error('Account not found');

    await db('accounts')
      .where({ id: account.id })
      .update({
        balance: db.raw(`balance + ${amount}`),
        updated_at: new Date(),
      });

    const [transaction] = await db('transactions')
      .insert({
        user_id: account.user_id,
        account_id: account.id,
        type: 'deposit',
        amount,
        recipient_account: null,
        recipient_bank: null,
        status,
        reference,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    await db('webhook_logs').insert({
      payload: JSON.stringify(payload),
      transaction_id: transaction.id,
      created_at: new Date(),
    });
  } catch (error: any) {
    throw new Error(`Webhook processing failed: ${error.message}`);
  }
};
