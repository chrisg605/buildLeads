'use server';
import prisma from "@/../lib/prisma";
import { auth0 } from '@/lib/auth0';

export async function cancelSubscription() {
  const session = await auth0.getSession();
  const userId = session?.user.sub;
  const stripe = require('stripe')(process.env.STRIPE_KEY);
  const express = require('express');
  const app = express();
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (!userId) throw new Error('Not authenticated');

  const user = await prisma.users.findUnique({
    where: { auth0_id: userId },
    select: { stripe_subscription_id: true },
  });

  if (!user?.stripe_subscription_id) throw new Error('No active subscription');

  // Cancels at end of billing period — user keeps access until then
  await stripe.subscriptions.update(user.stripe_subscription_id, {
    cancel_at_period_end: true,
  });

}