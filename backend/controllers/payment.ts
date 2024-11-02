import { Request, Response } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req: Request, res: Response) =>  {
  try {
    const { amount } = await req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Internal Error:', error);
    // Handle other errors (e.g., network issues, parsing errors)
    return req.body.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
};



