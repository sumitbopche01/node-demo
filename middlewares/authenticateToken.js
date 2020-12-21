const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = require('../config/jwtToken').ACCESS_TOKEN_SECRET;

exports.authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) {
        let response = {
            status: false,
            message: 'Please provide token in header'
        }

        return res.status(401).send(response) // if there isn't any token
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            let response = {
                status: false,
                message: 'Authentication failure, please login again'
            }
            return res.status(403).send(response);
        }
        req.user = user
        next() // pass the execution to next task
    });
};
