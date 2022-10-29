import Cart from '../models/cart';

import * as  _ from 'lodash';

class CartCtrl {

  static async one(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const id = _.get(ctx, 'params.id');
      
      const cart = await Cart.one(id, user.id);

      ctx.body = cart;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async list(ctx) {
    try {
      const user = _.get(ctx, 'state.user', { id :'5b727aee-9c29-47d9-9496-7366a74e5090'});
      const carts = await Cart.list(user.id);

      ctx.body = carts;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async create(ctx) {
    try {
      const user = _.get(ctx, 'state.user', { id :'5b727aee-9c29-47d9-9496-7366a74e5090'});
      const data = _.get(ctx, 'request.body', {});

      const cartExist = await Cart.oneByUser(user.id);

      if (cartExist) {
        throw new Error('You have in active cart, You can not craete a new one');
      }

      const cartData = {
        userId: user.id,
        ...data
      }

      const cart = await Cart.create(cartData);

      ctx.body = cart;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async update(ctx) {
    try {
      const user = _.get(ctx, 'state.user', { id :'5b727aee-9c29-47d9-9496-7366a74e5090'});
      const { id } = _.get(ctx, 'request.params', {});
      const data = _.get(ctx, 'request.body', {});

      const cart = await Cart.update(id, user.id, data);

      ctx.body = cart;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async delete(ctx) {
    try {
      const user = _.get(ctx, 'state.user', { id :'5b727aee-9c29-47d9-9496-7366a74e5090'});
      const { id } = _.get(ctx, 'request.params', {});
      
      const cart = await Cart.delete(id, user.id);

      ctx.body = cart;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }
}

export default CartCtrl;
