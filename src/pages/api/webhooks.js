import Stripe from 'stripe';
import { buffer } from 'micro';
import { getDatabase,ref,set } from 'firebase/database';
import firebaseInitialization from '../../firebase/firebase.init';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handleWebhookEvent(req, res) {
  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);
  const database=getDatabase(firebaseInitialization())
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(`Payment successful for session ID: ${session.id}`);
      console.log(`User id ${session?.metadata?.user_id}`)
      console.log(`Course Data ${session?.metadata?.courses}`);
      //await push(userRef, session?.metadata?.courses);
      const userId = session?.metadata?.user_id;
      const coursesData = JSON.parse(session?.metadata?.courses);

      for (const course of coursesData) {
        const userRef = ref(database, `users/${userId}/${course?.id}`);
        await set(userRef,course);
      }
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  res.status(200).end();
}

export default handleWebhookEvent;