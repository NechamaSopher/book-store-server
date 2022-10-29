import Order from '../models/order';
import Cart from '../models/cart';

import MailCtrl from './mail'
import StripeCtrl from './stripe';

import * as  _ from 'lodash';

class OrderCtrl {

  static async one(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const id = _.get(ctx, 'params.id');
      
      const order = await Order.one(id, user.id);

      ctx.body = order;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async list(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const orders = await Order.list(user.id);

      ctx.body = orders;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async create(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const { cartId } = _.get(ctx, 'request.body', {});
      
      const activeCart = await Cart.one(cartId, user.id);

      if (!activeCart) {
        throw new Error('You can not create this order, your do not have in an active cart.');
      }

      const order = await Order.create({ cartId });
      
      await Cart.update(cartId, user.id, { active: false })

      ctx.body = order;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async purchase(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const id = _.get(ctx, 'params.id');
      const { card } = _.get(ctx, 'request.body', {});

      const toPay = await Order.getOrderTotal(id);

      const paymentData = {
        card: JSON.parse(card),
        email: user.email,
        toPay
      }
      
      const charge = await StripeCtrl.charge(paymentData);

      if (!charge) {
        throw new Error('Charge Failed');
      }

      const order = await Order.update(id, { status: 'PAID'});

      const emailUrl = await sendEmail(user.email, 'paid');

      ctx.body = { order, emailUrl };
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async refund(ctx) {
    try {
      const user = _.get(ctx, 'state.user', { id :'5b727aee-9c29-47d9-9496-7366a74e5090', email: 'nechami2212@gmail.com'});
      const { id } = _.get(ctx, 'request.params', {});
      
      // get amount to refund
      // refund

      await Order.update(id, { status: 'REFUND'});

      const res = await sendEmail(user.email, 'refund');      

      ctx.body = { message: 'You where Refunded for Order', emailUrl: res };
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }
}

export default OrderCtrl;

const sendEmail = async (email, status) => {
  const emailData = {
    to: email,
    from: 'bookstore@gmail.com',
    subject: `Booksrote - Order ${status}`,
    html:  status === 'paid' ? getConfirmationMailHtml() : getRefundMailHtml(),
  };

  return await MailCtrl.send(emailData);
}

const getRefundMailHtml = () => {
  return `
  <html>
    <div dir="rtl" style="font-family: 'Open Sans Hebrew'; width: fit-content; margin: auto; text-align: center;">
      <div style="background: #595E79; width: 40vw; height: 40vh;">
      </div>

      <div style="margin: 8vh 0; text-align: center;">
        <font size="6rem" style="color: #6E6D7D; font-weight: 800;">,Dear customer</font> <br/>
        <br/>
        <font size="4rem" style="color: #8D8C9B; font-weight: 600">We refunded you for your book order from</font> <br/>
      </div>
    </div>
  <html>`;
}

const getConfirmationMailHtml = () => {
  return `
  <html>
    <div dir="rtl" style="font-family: 'Open Sans Hebrew'; width: fit-content; margin: auto; text-align: center;">
      <div style="background: #595E79; width: 40vw; height: 40vh;">
      </div>

      <div style="margin: 8vh 0; text-align: center;">
        <font size="6rem" style="color: #6E6D7D; font-weight: 800;">,Dear customer</font> <br/>
        <br/>
        <font size="4rem" style="color: #8D8C9B; font-weight: 600">Thank you for your order</font> <br/>
        <font size="4rem" style="color: #8D8C9B; font-weight: 600">....All set, your books are on the way to you</font> <br/>
      </div>
    </div>
  <html>`;
}