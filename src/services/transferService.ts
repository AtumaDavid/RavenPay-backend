import db from '../models/db';
import { Transaction } from '../types';

// export const processTransfer = async (
//   senderId: number,
//   recipientAccount: string,
//   amount: number,
//   reference: string
// ): Promise<Transaction> => {
//   try {
//     if (amount <= 0) throw new Error('Amount must be positive');

//     const [transactionResult] = await db.transaction(async (trx) => {
//       const sender = await trx('accounts').where({ user_id: senderId }).first();
//       if (!sender) throw new Error('Sender account not found');
//       if (sender.balance < amount) throw new Error('Insufficient balance');

//       const recipient = await trx('accounts')
//         .where({ account_number: recipientAccount })
//         .first();
//       if (!recipient) throw new Error('Recipient account not found');

//       await trx('accounts')
//         .where({ id: sender.id })
//         .update({
//           balance: db.raw(`balance - ${amount}`),
//           updated_at: new Date(),
//         });

//       await trx('accounts')
//         .where({ id: recipient.id })
//         .update({
//           balance: db.raw(`balance + ${amount}`),
//           updated_at: new Date(),
//         });

//       const [transaction] = await trx('transactions')
//         .insert({
//           user_id: senderId,
//           account_id: sender.id,
//           type: 'transfer',
//           amount,
//           recipient_account: recipientAccount,
//           recipient_bank: 'RavenPay Bank',
//           status: 'completed',
//           reference,
//           created_at: new Date(),
//           updated_at: new Date(),
//         })
//         .returning('*');

//       return transaction;
//     });

//     return transactionResult;
//   } catch (error: any) {
//     throw new Error(`Transfer failed: ${error.message}`);
//   }
// };

export const processTransfer = async (
  senderId: number,
  recipientAccount: string,
  amount: number,
  reference: string
): Promise<Transaction> => {
  try {
    if (amount <= 0) throw new Error('Amount must be positive');

    const transactionResult = await db.transaction(async (trx) => {
      const sender = await trx('accounts').where({ user_id: senderId }).first();
      if (!sender) throw new Error('Sender account not found');
      if (sender.balance < amount) throw new Error('Insufficient balance');

      const recipient = await trx('accounts')
        .where({ account_number: recipientAccount })
        .first();
      if (!recipient) throw new Error('Recipient account not found');

      await trx('accounts')
        .where({ id: sender.id })
        .update({
          balance: db.raw(`balance - ${amount}`),
          updated_at: new Date(),
        });

      await trx('accounts')
        .where({ id: recipient.id })
        .update({
          balance: db.raw(`balance + ${amount}`),
          updated_at: new Date(),
        });

      const insertedIds = await trx('transactions').insert({
        user_id: senderId,
        account_id: sender.id,
        type: 'transfer',
        amount,
        recipient_account: recipientAccount,
        recipient_bank: 'RavenPay Bank',
        status: 'completed',
        reference,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const transactionId = insertedIds[0];
      const transaction = await trx('transactions')
        .where({ id: transactionId })
        .first();

      return transaction;
    });

    return transactionResult;
  } catch (error: any) {
    throw new Error(`Transfer failed: ${error.message}`);
  }
};
