import * as  _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const authenticateToken = async (ctx, next) => {  
  const authHeader =  _.get(ctx,'request.header.authorization');

  const token = authHeader && authHeader.trim().split(' ')[1];

  if (!token) {
    ctx.body = new Error('No token');
    ctx.status = 401;
    return;
  }

  await new Promise((resolve, reject)=> {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        ctx.body = new Error('Your token is no longer valid');
        ctx.status = 403;
        resolve(false);
      }
    
      ctx.state.user = user;      
      await next();
      
      resolve(ctx);
    })
  })
}

export default authenticateToken;

