import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01'
});

class StripeCtrl {

  static async checkoutSession(items) {
    try {      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items,
        success_url: process.env.SERVER_URL,
        cancel_url: process.env.SERVER_URL
      })

      return session;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async charge(data) {
    try {
      const token =  await stripe.tokens.create({ card : data.card });      

      const charge = await stripe.charges.create({
        amount: data.toPay.sum,
        currency: data.toPay.currency.toLowerCase(),
        description: data.email,
        source: token.id
      });

      return charge;
    } catch (err) {
      throw new Error(err);
    }
  }

}
export default StripeCtrl;

