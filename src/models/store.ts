import { Model } from 'objection';

import * as  _ from 'lodash';

class Store extends Model {
  id: string;
  name: string;
  createdBy: string;
  currency: string;
  active: boolean

  static get tableName() {
    return 'store';
  }

  toBody() {
    return {
      id: this.id,
      name: this.name,
      createdBy: this.createdBy,
      currency: this.currency,
      active: this.active
    };
  }

  static async one(id) {
    try {
      const store = await Store.query().where({ id }).first();
      return store.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve store');
    }
  }

  static async list() {
    try {
      const stores = await Store.query().where({ active: true });
      
      return stores.map(store => store.toBody());
    } catch (err) {
      console.error(err);
      throw new Error('Failed to get stores');
    }
  }

  static async create(data) {
    try {
      const store = await Store.query().insertGraphAndFetch(data);
      return store.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create store');
    }
  }

  static async update(id, userId, data) {
    try {
      const store = await Store.query().where({ createdBy: userId }).patchAndFetchById(id, data);
      return store.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update stoe');
    }
  }

  static async delete(id, userId) {
    try {
      const res = await Store.query().where({ createdBy: userId }).deleteById(id);
      return res;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete store');
    }
  }

}

export default Store;
