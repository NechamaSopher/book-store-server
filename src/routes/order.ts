
import * as Router from 'koa-router';
import OrderCtrl from '../controllers/order';

const router = new Router({ prefix: '/order' });

router.get('/:id', OrderCtrl.one);

router.post('/', OrderCtrl.create);

router.put('/purchase/:id', OrderCtrl.purchase);
router.put('/refund/:id', OrderCtrl.refund);

module.exports = router.routes();
