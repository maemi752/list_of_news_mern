const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')

class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login (req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})

            if (!user) {
                return res.status(404).json({message: "User not found"})
            }

            const isPassValid = bcrypt.compareSync(password, user.password)

            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }    
                   
            const token = jwt.sign({id: user._id}, config.get("secretKey"), {expiresIn: "24h"})
            return res.json({
                token,
                _id: user.id,
                nickname: user.username,                
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }       
    }

    async auth (req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user._id}, config.get("secretKey"), {expiresIn: "24h"})
            return res.json({
                token,
                _id: user.id,
                nickname: user.username,                
            })
        } catch (e) {
            console.log(e)
        }       
    }
}

module.exports = new authController()