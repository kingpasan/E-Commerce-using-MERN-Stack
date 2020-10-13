const express = require('express');
const router = express.Router();

const { create, productByID, read, remove, update, list } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userByID } = require('../controllers/user');

router.get("/product/:productID", read);
router.post("/product/create/:userID", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productID/:userID", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productID/:userID", requireSignin, isAuth, isAdmin, update);
router.get("/products", list);

router.param('userID', userByID);
router.param('productID', productByID);

module.exports = router;