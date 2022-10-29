import { RandomUUIDOptions } from 'crypto';
import { Model, raw } from 'objection';

class User extends Model {
  
  id: RandomUUIDOptions;
  email: string;
  password: string;
  refreshTokens: string[];

  static get tableName() {
    return 'users';
  }

  toBody() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      refreshTokens: this.refreshTokens
    };
  }

  static async one(id) {
    try {
      const user = await User.query().where({ id }).first();
      
      return user.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve user');
    }
  }

  static async create(data) {
    try {
      const user = await User.query().insertGraphAndFetch(data);
      return user.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create user');
    }
  }

  static async update(id, data) {
    try {
      const user = await User.query().patchAndFetchById(id, data);
      return user.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update user');
    }
  }

  static async delete(id) {
    try {
      const res = await User.query().deleteById(id);
      return res;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete user');
    }
  }

  static async getByMail(email) {
    try {
      const res = await User.query().where(raw('LOWER("email")'), email.toLowerCase());
      const user = res[0];

      return user ? user.toBody() : null;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to get user by mail');
    }
  }
}

export default User;
