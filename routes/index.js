var express = require('express');
var router = express.Router();
const artController = require('../controllers/artControllers');

/* GET home page. */
router.get('/', artController.index);

// show art
router.get('/:id', artController.show);

// create art
router.post('/', artController.create);

// update art
router.post('/:id', artController.update);

// delete art
router.post('/:id/delete', artController.delete);

module.exports = router;
