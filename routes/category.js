const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userByID } = require('../controllers/user');

router.post("/category/create/:userID", requireSignin, isAuth, isAdmin, create);

router.param('userID', userByID);

module.exports = router;