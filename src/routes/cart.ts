
import * as Router from 'koa-router';
import CartCtrl from '../controllers/cart';

const router = new Router({ prefix: '/cart' });

router.get('/', CartCtrl.list);
router.get('/:id', CartCtrl.one);

router.post('/', CartCtrl.create);

router.put('/:id', CartCtrl.update);

router.delete('/:id', CartCtrl.delete);

module.exports = router.routes();
