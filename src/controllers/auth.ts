import UserCtrl from './user';

import * as bcrypt from 'bcrypt';
import * as  _ from 'lodash' ;
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

class AuthCtrl {

  static async signIn(ctx) {
    try {
      const data = _.get(ctx, 'request.body', {});
      const { email, password } = data;      

      if (!passwordValid(password)) {
        throw new Error('Invaild password');
      }

      if (!passwordEmail(email)) {
        throw new Error('Invaild email');
      }

      const userExist = await UserCtrl.getByMail(email);      

      if (userExist) {
        throw new Error('User exist in the system');
      }

      const user = await UserCtrl.create(data);
      _.unset(user, 'password');      

      ctx.body = user;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async login(ctx) {
    try {
      const data = _.get(ctx, 'request.body', {});
      const { email, password } = data;

      const user = await UserCtrl.getByMail(email);

      if (!user) {
        throw new Error('Incorrect email');
      }

      const compareRes = await bcrypt.compare(password, user.password);

      if (!compareRes) {
        throw new Error('Incorrect password');
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

      const refreshTokens = [ ...user.refreshTokens, refreshToken];

      await UserCtrl.update(user.id, { refreshTokens });
      
      ctx.body = { accessToken, refreshToken };
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async token(ctx) {
    try {      
      const { token } = _.get(ctx, 'request.body', {});

      if (!token) {
        ctx.body = new Error('No token');
        ctx.status = 401;
        return;
      }

      return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
          if (err) {
            ctx.body = new Error('Your token is no longer valid');
            ctx.status = 403;
            resolve(false);
          }
          
          const user = await UserCtrl.one(decoded.id);

          if(!user.refreshTokens.includes(token)) {{
            ctx.body = new Error('Your token is no longer valid');
            ctx.status = 403;
            resolve(false);
          }}

          const accessToken = await generateAccessToken(user);
          
          ctx.body = { accessToken };
          resolve(ctx)
        });
      })
     
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

}

export default AuthCtrl;

const passwordValid = (password) => {  
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

const passwordEmail = (email) => {  
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

