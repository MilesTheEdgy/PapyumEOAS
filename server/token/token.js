const jwt = require("jsonwebtoken")


function generateAccessToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '204800s' });
    //add eczane name as well ?
}
  
function authenticateToken(req, res, next) {
    console.log('verifiying token...')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(`the token being verified: ${authHeader.split(' ')[1]}`);
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
        console.log(err);
        return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}