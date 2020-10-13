const express = require('express');
const router = express.Router();

const { create, categoryByID, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userByID } = require('../controllers/user');

router.get("/category/:categoryID", read);
router.post("/category/create/:userID", requireSignin, isAuth, isAdmin, create);
router.put("/category/:categoryID/:userID", requireSignin, isAuth, isAdmin, update);
router.delete("/category/:categoryID/:userID", requireSignin, isAuth, isAdmin, remove);
router.get("/categories", list);

router.param('categoryID', categoryByID)
router.param('userID', userByID);

module.exports = router;