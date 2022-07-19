const db = require("../config/db/postgres");
const User = db.user;
const Op = db.Sequelize.Op;

exports.loginUser = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    User.findOne({ where: { "email": `${req.body.email}` } })
        .then( async (data) => {
            if (data) {
                if (!data.dataValues.password || !await data.validPassword(req.body.password, data.dataValues.password)) {
                    resolve(false);
                } 
                res.send(data);
            } else {
                res.status(404).send({
                message: `Cannot find user.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email" + req.body.email
            });
        });
};

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
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user.",
            });
        });
};
