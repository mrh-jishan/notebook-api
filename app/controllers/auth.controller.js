const User = require('../models/user.model');
const authService = require('./../service/auth.service');

const register = (req, res, next) => {

    User.findOne({ email: req.body.email }).exec((err, user) => {

        if (user) {
            next({ err: 'Sorry! The user already exist' })
        }

        new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: authService.hashSync(req.body.password),
            mobile: req.body.mobile
        }).save()
            .then(data => {
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
            }

            const isPasswordValid = authService.compareSync(req.body.password, user.password);

            if (isPasswordValid) {
                const token = authService.authToken(user);
                res.body = {
                    data: {
                        user: user,
                        token: token,
                    }
                }
                next();

            } else {
                next({ err: 'Sorry! Authentication Failed.' })
            }
        });
}


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