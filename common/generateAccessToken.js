const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = require('../config/jwtToken').ACCESS_TOKEN_SECRET;

exports.generateAccessToken = (data) => {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}
