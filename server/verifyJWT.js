const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"].slice(6);
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({
                    isLoggedIn: false,
                    message: "Failed To Authenticate"
                })
            } else {
                req.user = {};
                req.user.id = decoded.id
                req.user.username = decoded.username
                next()
            }
        })
    } else {
        res.json({ message: "Incorrect Token Given", isLoggedIn: false })
    }
  }

module.exports = verifyJWT;