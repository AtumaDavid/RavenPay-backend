import { Request, Response } from 'express';
import { processDepositWebhook } from '../services/webhookService';

export const handleWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    await processDepositWebhook(payload);
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
