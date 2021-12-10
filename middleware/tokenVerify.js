const jwt = require('jsonwebtoken')


const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json({ "message": "Access error. No token provided" })
    } else {
        jwt.verify(token, process.env["SECRET"], (err, decoded) => {
            if (err) {
                res.status(401).json({ auth: false, message: "Access error. Token invalid or expired" })
            } else {
                req.user_id = decoded.user_id
                next()
            }
        })
    }
}


module.exports = verifyJWT