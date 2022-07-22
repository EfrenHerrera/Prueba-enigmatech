const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../../config/db/postgres");
const User = db.models.user;

module.exports = {
    userCreate: async args => {
        try {

            if (!args.userInput.email) {
                throw "Content can not be empty!";
            }

            const user = {
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                password: args.userInput.password,
            };
            
            const result = await User.create(user)
            
            return { 
                ...result._doc, 
                password: null, 
                _id: result.id, 
                firstName: result.firstName, 
                lastName: result.lastName, 
                email: result.email 
            };

        } catch (err) {
            throw err;
        }
    },
    
    login: async ({ email, password }) => {

        const user = await User.findOne({ where: { email: email} });

        if (!user) {
            throw new Error('User does not exist!');
        }

        const isEqual = await  bcrypt.compareSync(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, 'somesupersecretkey',
            { expiresIn: '5h' }
        );
        return { id: user.id, token: token, tokenExpiration: 1 };
    }
};