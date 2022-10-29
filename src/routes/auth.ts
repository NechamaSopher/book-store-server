
import * as Router from 'koa-router';
const router = new Router();

import AuthCtrl from '../controllers/auth';

router.post('/signin', AuthCtrl.signIn);
router.post('/login', AuthCtrl.login);
router.post('/token', AuthCtrl.token);

module.exports = router.routes();
