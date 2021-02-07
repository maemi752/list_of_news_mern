const Router = require("express");
const controller = require('../controllers/auth.controller');
const router = new Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").isLength({min:3, max:15}),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)

router.post('/login', controller.login)

router.get('/user', authMiddleware, controller.auth)



module.exports = router