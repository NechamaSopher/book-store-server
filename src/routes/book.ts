
import * as Router from 'koa-router';
import BookCtrl from '../controllers/book';

const router = new Router({ prefix: '/book' });

router.get('/', BookCtrl.list);
router.get('/:id', BookCtrl.one);

router.post('/', BookCtrl.create);

router.put('/:id', BookCtrl.update);

router.delete('/:id', BookCtrl.delete);

module.exports = router.routes();
