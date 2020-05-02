const User = require('../models/user.model');
const authService = require('./../service/auth.service');

const register = (req, res) => {

    User.findOne({ email: req.body.email }).exec((err, user) => {

        if (user) {
            return res.status(500).json({
                message: "Sorry! The user already exist"
            });
        }

        new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: authService.hashSync(req.body.password),
            mobile: req.body.mobile
        }).save()
            .then(data => {
                res.status(200).json(data);
            }).catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
    });
};

const login = (req, res) => {

    User.findOne({ email: req.body.email })
        .select('+password')
        .exec((err, user) => {
            if (!user) {
                console.log('user not found');
                return res.status(500).send({
                    message: "Sorry! Authentication Failed."
                });
            }

            const isPasswordValid = authService.compareSync(req.body.password, user.password);

            if (isPasswordValid) {
                return res.status(200).json({
                    user: user,
                    token: authService.authToken(user),
                })
            } else {
                console.log('password missmatch');
                return res.status(500).send({
                    message: "Sorry! Authentication Failed."
                });
            }
        });
}


const me = (req, res) => {

    User.findById(req.user.id)
        .populate('notes')
        .populate('todos')
        .lean()
        .exec((err, user) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(200).json(user)
        });
}

module.exports = {
    login,
    register,
    me
}