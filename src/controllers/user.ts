import User from '../models/user';

import * as bcrypt from 'bcrypt';
import * as  _ from 'lodash' ;

class UserCtrl {

  static async create(data) {
    const passwordHash = data.password ? bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)) : null;
    const userData = { ...data, password: passwordHash };
    
    return User.create(userData);
  }

  static async update(id, data) {
    _.has(data, 'refreshTokens') && (data.refreshTokens = `[${data.refreshTokens.reduce((res, token) => token ? [`"${token}"`, ...res] : res, [])}]`);

    return User.update(id, data);
  }

  static one(id) {
    return User.one(id);
  }

  static getByMail(email) {
    return User.getByMail(email);
  }
}

export default UserCtrl;

