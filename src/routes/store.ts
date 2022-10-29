
import * as Router from 'koa-router';
import StoreCtrl from '../controllers/store';

const router = new Router({ prefix: '/store' });

router.get('/', StoreCtrl.list);
router.get('/:id', StoreCtrl.one);

router.post('/', StoreCtrl.create);

router.put('/:id', StoreCtrl.update);

router.delete('/:id', StoreCtrl.delete);

module.exports = router.routes();
