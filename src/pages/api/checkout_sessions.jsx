import { NextRequest,NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) { 
  console.log(req.body.user);
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items:req?.body?.data?.map(item=>{
          return{
            price_data: {
              currency: 'usd',
              unit_amount: item.price*100,
              product_data: {
                name: item.title,
              },
            },
            quantity: item.quantity,
          }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          user_id: req.body.user,
          courses:JSON.stringify(req?.body?.data)
        }
      });
      return res.json({session});
    } catch (err) {
      return res.json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}