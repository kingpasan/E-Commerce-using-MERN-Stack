const express = require('express');
const router = express.Router();

const { create } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userByID } = require('../controllers/user');

router.post("/product/create/:userID", requireSignin, isAuth, isAdmin, create);

router.param('userID', userByID);

module.exports = router;