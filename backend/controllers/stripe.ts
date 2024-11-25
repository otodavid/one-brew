import { query, Request, Response } from 'express';
import { convertFromCents, convertToCents } from '../helpers/utils';
import Stripe from 'stripe';
import conn from '../config/db';
import { CartItem } from '../types';
import {
  queryDeleteUserCart,
  queryInsertNewOrder,
  updateUserOrder,
} from '../queries/users';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req: Request, res: Response) => {
  try {
    const { orderAmount, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToCents(orderAmount),
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId,
      },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Internal Error:', error);
    res.status(500);
    return res.json({ error: `Internal Server Error: ${error}` });
  }
};

// add order to database in 'pending' status
export const handleAddUserOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, orderAmount, order, userEmail } = req.body;
    const query = queryInsertNewOrder();
    const result = conn.query(query, [
      orderId,
      userEmail,
      JSON.stringify(order),
      orderAmount,
    ]);

    console.log('order added to the database on "pending" status');
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error adding new order to database' });
  }
};

// confirm transaction and update status of order & amount (in whole dollars) in database
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
    const { orderId } = paymentIntent.metadata;
    const { amount } = paymentIntent;

    try {
      const wholeDollars = convertFromCents(amount);

      // update the order in PostgreSQL
      const updateQuery = updateUserOrder();
      const result = await conn.query('', [orderId, wholeDollars, 'confirmed']);

      const userEmail = result.rows[0].user_email;

      // delete user cart from database
      const deleteQuery = queryDeleteUserCart();
      await conn.query(deleteQuery, [userEmail]);

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error saving customer order:', error);
      res.status(500).send('Error saving order');
    }
  } else {
    res.status(400).end();
  }
};
