import { Model } from 'objection';

import * as  _ from 'lodash';

class Order extends Model {
  id: string;
  createAt: string;
  cartId: string;
  status: string;

  static get tableName() {
    return 'orders';
  }

  toBody() {
    return {
      id: this.id,
      createAt: this.createAt,
      cartId: this.cartId,
      status: this.status
    };
  }

  static async one(condObject) {
    try {
      const order = await Order.query().where(condObject).first();
      return order.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve order');
    }
  }

  static async create(data) {
    try {
      const order = await Order.query().insertGraphAndFetch(data);
      return order.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create order');
    }
  }

  static async update(id, data) {
    try {
      const order = await Order.query().patchAndFetchById(id, data);
      return order.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update order');
    }
  }

  static async getItemsInfo(orderId) {
    try {
      const res = await Order.knex().raw(`
        SELECT book.title, book.price, store.currency, item.value as quantity
        FROM orders
        JOIN cart 
          ON cart.id = orders.cart_id
        CROSS JOIN LATERAL JSONB_EACH(cart.items) AS item
        INNER JOIN book 
          ON book.id = item.key::UUID
        JOIN store 
          ON store.id = book.store_id
        WHERE orders.id = '${orderId}'
      `);

      return _.get(res, 'rows');
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve professions by system');
    }
  }

  static async getOrderTotal(orderId) {
    try {
      const res = await Order.knex().raw(`
        SELECT store.currency, SUM(b.sum) 
        FROM (SELECT book.store_id, SUM(book.price * (item.value)::INT)
              FROM orders
              JOIN cart 
                ON cart.id = orders.cart_id
              CROSS JOIN LATERAL JSONB_EACH(cart.items) AS item
              INNER JOIN book 
                ON book.id = item.key::UUID
              WHERE orders.id = '${orderId}'
            GROUP BY book.store_id
          ) as b
          JOIN store 
            ON b.store_id = store.id
          GROUP BY store.currency`);

      return _.get(res, 'rows[0]');
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve professions by system');
    }
  }
}

export default Order;
