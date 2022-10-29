import { Model } from 'objection';

import * as  _ from 'lodash';

class Cart extends Model {
  id: string;
  createdBy: string;
  currency: string;
  active: boolean;
  items: any;

  static get tableName() {
    return 'cart';
  }

  toBody() {
    return {
      id: this.id,
      createdBy: this.createdBy,
      currency: this.currency,
      active: this.active,
      items: this.items
    };
  }

  static async one(id, userId) {
    try {
      const cart = await Cart.query().where({ id, userId, active: true }).first();
      return cart ? cart.toBody() : null;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve cart');
    }
  }

  static async oneByUser(userId) {
    try {
      const cart = await Cart.query().where({ userId, active: true }).first();
      return cart ? cart.toBody() : null;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve cart');
    }
  }

  static async list(userId) {
    try {
      const carts = await Cart.query().where({ userId, active: true });
      
      return carts.map(cart => cart.toBody());
    } catch (err) {
      console.error(err);
      throw new Error('Failed to get carts');
    }
  }

  static async create(data) {
    try {
      const cart = await Cart.query().insertGraphAndFetch(data);
      return cart.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create cart');
    }
  }

  static async update(id, userId, data) {
    try {
      const cart = await Cart.query().where({ userId, active: true }).patchAndFetchById(id, data);
      return cart.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update cart');
    }
  }

  static async delete(id, userId) {
    try {
      const res = await Cart.query().where({ userId }).deleteById(id);
      return res;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete cart');
    }
  }

}

export default Cart;
