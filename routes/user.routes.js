const express = require('express');
const router = express.Router();
const { homepage, userRegister, userLogin, userLogout, userAll } = require('../controllers/user.controller');


// Homepage 
router.get("/homepage",homepage)

router.get("/allUser",userAll)

// REGISTER
router.post('/user-register',userRegister);

//LOGIN
router.post('/user-login',userLogin);

//LOGOUT
router.get('/user-logout',userLogout);




module.exports = router