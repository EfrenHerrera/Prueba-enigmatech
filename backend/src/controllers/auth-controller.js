const db = require("../config/db/postgres");
const jwt = require('jsonwebtoken');
var request = require('request');
const User = db.models.user;
var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
var access_token = {}

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

                const token = jwt.sign(
                    { userId:  data.dataValues.id, email:  data.dataValues.email }, 'somesupersecretkey',
                    { expiresIn: '5h' }
                );
                
                res.send({data, token });

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

exports.callBack = (req, res) => {
    var code = req.query.code;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: "http://localhost:8080/auth/callback",
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        console.log(body)
        if (!error && response.statusCode === 200) {
            access_token = body;
        }
    });
};

exports.getToken = (req, res) => {
    res.json({
        access_token: access_token
    })
};