let fs = require('fs');

/**
 * @description sign up controllers 
 */
exports.signUp = async (req, res) => {
    let data = fs.readFileSync("database/users.json");
    let users = JSON.parse(data);

    let { username, password } = req.body;
    //check if user already present or not
    if (users[username]) {
        return res.json({ status: false, message: "Username already taken" });
    }
    users[username] = password;
    data = JSON.stringify(users, null, 2);//we need to convert json into string before writing it into file

    //save new user in database, here I have json file as db
    fs.writeFile("database/users.json", data, (err) => {
        if (err) {
            console.log('Error (signup.js) ', err);
            return res.status(500).send({ status: false, message: "Something went wrong. Please try again later." })
        }
        return res.status(201).send({ status: true, message: "Thank you signing up :)" });
    });
}
