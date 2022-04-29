const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyJWT = require('../verifyJWT');

const User = require('../models/User');

router
    .get('/get', (req, res, next) => {
        User.find()
        .exec()
        .then((user) => res.json(user))
        .catch((err) => next(err));
    })

    .get('/isUserAuth', verifyJWT, (req, res) => {
        res.json({isLoggedIn: true, username: req.user.username})
    })

    .post('/register', async (req, res) => {
        let user = req.body.body;

        const takenUsername = await User.findOne({username: user.username})
        const takenEmail = await User.findOne({email: user.email })
        
        if (takenUsername || takenEmail) {
            res.json({message: "Username or email has already been taken"})
        } else {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)

            const dbUser = new User({
                username: user.username.toLowerCase(),
                email: user.email.toLowerCase(),
                password: user.password
            })

            await dbUser.save();
            res.json({
                message: "New account created",
                registered: true
            })
        }
    })

    .post('/login', async (req, res, next) => {
        const userLoggingIn = req.body.body;
        
        await User.findOne({
            username: userLoggingIn.username
        }).then(dbUser => {
            if (!dbUser) {
                return res.json({ message: "Invalid Username or Password" })
            }

            bcrypt.compare(userLoggingIn.password, dbUser.password).then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                    }
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        { expiresIn: 86400 },
                        (err, token) => {
                            if (err) return res.json({ message: err })
                            return res.json({
                                message: "Successfully logged in",
                                token: "Bearer" + token
                            })
                        }
                    )
                } else {
                    return res.json({ message: "Invalid Username or Password" })
                }
            })
        })
    })
 
module.exports = router;