
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, 'admin', (err, decoded) => {
            if (decoded) {
                console.log('decoded',decoded)
                req.body.userID = decoded.userId
                req.body.name = decoded.name
                req.body.isAdmin = decoded.isAdmin
                next()
            } else {
                res.send({ "Error": err })
            }
        })
    } else {
        res.send({ "msg": "Please login" })

    }
}

module.exports = {auth}