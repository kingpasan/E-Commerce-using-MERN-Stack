const express = require('express');
const router = express.Router();

const { create, productByID, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userByID } = require('../controllers/user');

router.get("/product/:productID", read);
router.post("/product/create/:userID", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productID/:userID", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productID/:userID", requireSignin, isAuth, isAdmin, update);
router.get("/products", list);
router.get("/products/related/:productID", listRelated)
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productID", photo)

router.param('userID', userByID);
router.param('productID', productByID);

module.exports = router;