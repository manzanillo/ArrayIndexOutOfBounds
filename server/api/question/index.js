var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
//router.delete('/:id', controller.destroy);
router.post('/:id/answers', controller.createAnswer);

router.put('/:id/upvote', controller.upvote);
router.delete('/:id/downvote', controller.downvote);
router.put('/:id/answers/:answerId/upvote', controller.upvoteAnswer);
router.delete('/:id/answers/:answerId/downvote', controller.downvoteAnswer);

module.exports = router;
