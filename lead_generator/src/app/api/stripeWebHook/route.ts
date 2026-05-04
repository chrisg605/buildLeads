"use server"
import { headers } from 'next/headers'
import prisma from "../../../../lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const stripe = require('stripe')(process.env.STRIPE_KEY, {
  apiVersion: '2026-03-25.dahlia',
});;
    let body = await request.text();
    let event = JSON.parse(body);
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = process.env.ENDPOINT_SECRET;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers.get('stripe-signature');
      try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`Webhook signature verification failed.`);
        return Response.json({error: "invalid signature"}, {status: 400});
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        await prisma.users.update({
          where: {
            stripe_id: subscription.customer,
          },
          data : {
            credits : 0,
            stripe_id: null,
            next_sub: -1,
            subscription: -1,
            stripe_subscription_id: null
          }
        })
        break;
      case 'checkout.session.completed':
        const lineItems = await stripe.checkout.sessions.listLineItems(event.data.object.id);
        const product = lineItems?.data[0].price.product;
        const {credits, sub} = (product == process.env.STRIPE_AGENCY_PRODUCT_KEY ? {credits: 300, sub: 2} :  product == process.env.STRIPE_PRO_PRODUCT_KEY ? {credits: 80, sub: 1} : product ==  process.env.STRIPE_BASIC_PRODUCT_KEY ? {credits: 30, sub: 0} : {credits: 0, sub: -1})
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);    
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
  
        const user = await prisma.users.update({
          where: {
            id: parseInt(subscription.metadata.user_id)
          },
          data : {
            credits : credits,
            stripe_id: subscription.customer,
            subscription: sub,
            next_sub: sub,
            nextSubDate: expiresAt,
            stripe_subscription_id: subscription.subscription
          }
        })
        break;
      case 'invoice.payment_succeeded':
        subscription = event.data.object;
        const billing_reason = subscription.billing_reason;
        if (billing_reason == "subscription_create"){
          break;
        }
        const invoice_prod = subscription.lines.data[0]?.pricing?.price_details?.product;
        
        
        const {credits_invoice, sub_invoice} = (invoice_prod == process.env.STRIPE_AGENCY_PRODUCT_KEY ? {credits_invoice: 300, sub_invoice: 2} :  invoice_prod == process.env.STRIPE_PRO_PRODUCT_KEY ? {credits_invoice: 80, sub_invoice: 1} : invoice_prod ==  process.env.STRIPE_BASIC_PRODUCT_KEY ? {credits_invoice: 30, sub_invoice: 0} : {credits_invoice: 0, sub_invoice: -1})
        status = subscription.status;
        await prisma.users.update({
          where: {
            stripe_id: subscription.customer,
          },
          data : {
            credits : {
              increment: credits_invoice
            },
            subscription: sub_invoice,
            next_sub: sub_invoice,
            nextSubDate: new Date(subscription.period_end * 1000)

          }
        })
        console.log(`Subscription status is ${status}.`);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);

         await prisma.users.update({
          where: {
            stripe_id: subscription.customer,
          },
          data : {
            stripe_subscription_id: subscription.id,
            ...(subscription.cancel_at_period_end ? {next_sub: -1} : {}),
            nextSubDate: new Date(subscription.items.data[0].current_period_end * 1000) 

          }
        })
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return new Response();
}