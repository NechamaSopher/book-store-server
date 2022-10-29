import * as  Router from 'koa-router';

import * as authRoutes from './auth';
import * as storeRoutes from './store';
import * as bookRoutes from './book';
import * as cartRoutes from './cart';
import * as orderRoutes from './order';

import authenticateToken  from '../middleware/authenticate-token';

const router = new Router({ prefix: '/api' });


router.use(authRoutes);
router.use(authenticateToken);
router.use(storeRoutes);
router.use(bookRoutes);
router.use(cartRoutes);
router.use(orderRoutes);

module.exports = router.routes();
