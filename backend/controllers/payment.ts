import { Request, Response } from 'express';
import { convertToCents } from '../helpers/utils';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToCents(amount),
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Internal Error:', error);
    res.status(500);
    return res.json({ error: `Internal Server Error: ${error}` });
  }
};
