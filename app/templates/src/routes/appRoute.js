const express = require('express');                                  // express
const router = express.Router();                                     // router object to route

const appController = require('../appController/appController');     //requiring functions in controller layer

router.get('/',appController.welcomeData);

module.exports = router;