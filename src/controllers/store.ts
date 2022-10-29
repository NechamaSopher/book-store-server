import Store from '../models/store';

import * as  _ from 'lodash';

class StoreCtrl {

  static async one(ctx) {
    try {      
      const id = _.get(ctx, 'params.id');
      
      const store = await Store.one(id);

      ctx.body = store;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async list(ctx) {
    try {
      const stores = await Store.list();

      ctx.body = stores;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async create(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});      

      const data = _.get(ctx, 'request.body', {});

      const storeData = {
        createdBy: user.id,
        ...data
      }

      const store = await Store.create(storeData);

      ctx.body = store;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async update(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const { id } = _.get(ctx, 'request.params', {});
      const data = _.get(ctx, 'request.body', {});

      const store = await Store.update(id, user.id, data);

      ctx.body = store;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async delete(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const { id } = _.get(ctx, 'request.params', {});

      const store = await Store.delete(id, user.id);

      ctx.body = store;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }
}

export default StoreCtrl;