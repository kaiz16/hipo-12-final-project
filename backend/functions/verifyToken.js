// token verification
const jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
    const token = req.headers['authorization']
    try {
        let verification = jwt.verify(token, process.env.SECRET_JWT_KEY)
        
        req.user = verification
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    verifyToken
}