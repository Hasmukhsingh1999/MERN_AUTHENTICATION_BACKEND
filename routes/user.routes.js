const express = require('express');
const router = express.Router();
const { homepage, userRegister, userLogin, userLogout } = require('../controllers/user.controller');


// Homepage 
router.get("/homepage",homepage)


// REGISTER
router.post('/user-register',userRegister);

//LOGIN
router.post('/user-login',userLogin);

//LOGOUT
router.get('/user-logout',userLogout);




module.exports = router