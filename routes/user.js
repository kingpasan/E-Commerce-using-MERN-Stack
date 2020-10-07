const express = require('express');
const router = express.Router();

const { requireSignin } = require('../controllers/auth');
const { userByID } = require('../controllers/user');


router.get("/secret/:userID", requireSignin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param('userID', userByID);

module.exports = router;