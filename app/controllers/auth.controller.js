const User = require('../models/user.model');
const authService = require('./../service/auth.service');

const register = (req, res, next) => {

    User.findOne({ email: req.body.email }).exec((err, user) => {

        if (user) {
            next({ err: 'Sorry! The user already exist' })
            return;
        }

        new User(req.body).save().then(data => {
            res.body = {
                data: data
            }
            next();
        }).catch(err => {
            next({ err: err.message || 'Some error occurred while creating the user.' })
        });
    });
};

const login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .select('+password')
        .exec((err, user) => {
            if (!user) {
                next({ err: 'Sorry! Authentication Failed.' })
                return;
            }

            user.comparePassword(req.body.password, function (err, isMatch) {
            
                if (err || !isMatch) {
                    next({ err: 'Sorry! Authentication Failed.' })
                    return;
                };

                res.body = {
                    data: {
                        user: user,
                        token: authService.authToken(user),
                    }
                }
                next();
            });
        });
};

const me = (req, res, next) => {

    User.findById(req.user.id)
        .populate('notes')
        .populate('todos')
        .lean()
        .exec((err, user) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    next({ err: 'User not found with id' + req.params.userId })
                }
                next({ err: 'Error retrieving user with id ' + req.params.userId })
            }

            if (!user) {
                next({ err: 'User not found with id' + req.params.userId })
            }
            res.body = {
                data: {
                    user: user
                }
            }
            next();
        });
}

module.exports = {
    login,
    register,
    me
}