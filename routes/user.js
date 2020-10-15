const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userByID, read, update } = require('../controllers/user');


router.get("/secret/:userID", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/user/:userID", requireSignin, isAuth, read);
router.put("/user/:userID", requireSignin, isAuth, update);


router.param('userID', userByID);

module.exports = router;