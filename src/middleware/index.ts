import * as compose from 'koa-compose';

import * as cors from 'koa2-cors';
import * as koaBody from 'koa-bodyparser';
import * as response from './response';

module.exports = compose([cors({ credentials: true }), koaBody({ jsonLimit: '100mb' }), response]);
