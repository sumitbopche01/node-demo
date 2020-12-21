const { generateAccessToken } = require('../../common/generateAccessToken');
const fs = require('fs');
/**
 * 
 * @description login controller
 */
exports.login = (req, res) => {
    let { username, password } = req.body;
    let response = {};
    let data = fs.readFileSync("database/users.json");
    let users = JSON.parse(data);
    if (users[username] && password == users[username]) {
        //Generate jwt token
        let token = generateAccessToken({ username, password });

        response = {
            status: true,
            message: `Login Successful, ${username}`,
            token
        }

        return res.status(200).send(response);
    }
    else {
        response = {
            status: false,
            message: "Invalid Username or password, please try again"
        }
        return res.status(200).send(response);
    }

}
