import { Request, Response } from 'express';
import { convertFromCents, convertToCents } from '../helpers/utils';
import Stripe from 'stripe';
import conn from '../config/db';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req: Request, res: Response) => {
  try {
    const { amount, order, userEmail } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToCents(amount),
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      metadata: {
        userEmail,
        products: JSON.stringify(
          order.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            size: product.size,
            addons: product.addons,
            quantity: product.quantity ?? 1,
          }))
        ),
      },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Internal Error:', error);
    res.status(500);
    return res.json({ error: `Internal Server Error: ${error}` });
  }
};

export const handleConfirmTransaction = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify the event signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log('Webhook signature verification failed.', err);
    res.status(400).send(`Webhook Error: ${err}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Extract customer and order details from metadata
    const { products, userEmail } = paymentIntent.metadata;
    const { amount } = paymentIntent;

    try {
      const wholeDollars = convertFromCents(amount);

      // Save the order in PostgreSQL
      await conn.query(
        'INSERT INTO customer_order (user_email, payment_intent_id, products, amount) VALUES ($1, $2, $3, $4);',
        [userEmail, paymentIntent.id, products, wholeDollars]
      );

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error saving customer order:', error);
      res.status(500).send('Error saving order');
    }
  } else {
    res.status(400).end();
  }
};
