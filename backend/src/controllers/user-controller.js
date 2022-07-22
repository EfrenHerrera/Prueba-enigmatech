const db = require("../config/db/postgres");
const jwt = require('jsonwebtoken');
const User = db.models.user;

exports.userCreate = (req, res) => {

    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    User.create(user)
        .then((data) => {
            const token = jwt.sign(
                { userId:  data.dataValues.id, email:  data.dataValues.email }, 'somesupersecretkey',
                { expiresIn: '5h' }
            );
            
            res.send({data, token });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user.",
            });
        });
};
