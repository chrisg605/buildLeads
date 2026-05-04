"use server"
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { getCustomUserId } from "@/lib/getUser";
import { auth0 } from "@/lib/auth0";
import { GetCustSub } from "@/app/(main)/pricing/functions/getCustSub";
import { redirect } from 'next/navigation'


export async function POST(request: Request) {
    const stripe = require('stripe')(process.env.STRIPE_KEY, {
  apiVersion: '2026-03-25.dahlia',
});;
    const express = require('express');
    const app = express();
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    const auth = await auth0.getSession();
    const auth_user = auth?.user;
    let auth_id = "";
    if (auth_user){
        auth_id = auth_user.sub;
    }
    else {
      return
    }
    const id = (await getCustomUserId(auth_id)) ?? 0;
    const sub = (await GetCustSub(auth_id));
    const formData = await request.formData();
    const product_key = formData.get("product_key")
    const YOUR_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || "https://studious-space-disco-4jq7559qvv75357xx-3000.app.github.dev/pricing";
    let purchased_sub = 0;
    if (product_key == process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRODUCT_KEY) {
      purchased_sub = 2;
    }
    else if (product_key == process.env.NEXT_PUBLIC_STRIPE_PRO_PRODUCT_KEY) {
      purchased_sub = 1;
    }
    else if (product_key == process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT_KEY) {
      purchased_sub = 0;
    }
    else {
      return new Response();
    }
  const prices = await stripe.prices.list({
    product: product_key,
    expand: ['data.product'],
  });

  
  if (sub != null && sub.subscription != -1 && sub.next_sub != -1 && (sub.subscription <= purchased_sub  || sub.credits == 0)) {//if subsciption purfhased alread, handle upgrade
    const customer = await stripe.subscriptions.list({
      customer: sub.stripe_id,
    });
    const subscription = await stripe.subscriptions.update(
        customer.data[0].id,
        
        {
          billing_cycle_anchor: "now",
          items: [
            {
              id: customer.data[0].items.data[0].id,
              price: prices.data[0].id,
            },
          ],
          proration_behavior: 'none',
        }
      );
      await prisma.users.update({
          where: {
            stripe_id: subscription.customer,
          },
          data : {
            next_sub: purchased_sub
          }
        })
      return redirect("/pricing");
    }
    else if (sub != null && sub.subscription != -1 && sub.subscription > purchased_sub && sub.next_sub != -1) {
      console.log("entered downgrade")
      const customer = await stripe.subscriptions.list({
      customer: sub.stripe_id,
      });
      const subscription = await stripe.subscriptions.update(
        customer.data[0].id,
        {
          items: [
            {
              id: customer.data[0].items.data[0].id,
              price: prices.data[0].id,
            },
          ],
          proration_behavior: 'none',
        }
      );

      await prisma.users.update({
          where: {
            stripe_id: subscription.customer,
          },
          data : {
            next_sub: purchased_sub
          }
        })
      return redirect("/pricing");
    }



  
  const session = await stripe.checkout.sessions.create({
    metadata: {
    user_id: id, // your DB user ID
    },
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        // For usage-based billing, don't pass quantity
        quantity: 1,

      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.redirect(session.url as string, 303);

}
