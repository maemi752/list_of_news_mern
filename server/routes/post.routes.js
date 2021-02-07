const Router = require("express");
const router = new Router();
const controller = require('../controllers/post.controller');

router.get('/', controller.get_posts)

router.post('/', controller.create)

router.get('/:id', controller.get_post)

router.delete('/:id', controller.delete)

router.put('/:id/like', controller.like)

router.put('/:id/unlike', controller.unlike)

module.exports = router