import { Request, Response } from 'express';
import { sendToExternalBank } from '../services/externalTransferService';

export const handleExternalTransfer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      userId,
      account_number: recipientAccount,
      bank_code: recipientBankCode,
      amount,
      reference,
      account_name: accountName,
    } = req.body;
    if (
      !userId ||
      !recipientAccount ||
      !recipientBankCode ||
      !amount ||
      !reference ||
      !accountName
    ) {
      throw new Error('Missing required fields');
    }
    const transaction = await sendToExternalBank(
      Number(userId),
      recipientAccount,
      recipientBankCode,
      Number(amount),
      reference,
      accountName
    );
    res
      .status(200)
      .json({ message: 'External transfer completed', transaction });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
