const Joi = require('@hapi/joi');

const loginValidator = (req, res, next) => {
    const { error } = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
    }).validate(req.body);

    if (error) {
        return res.status(400).json(error)
    }
    next();
}


const registerValidator = (req, res, next) => {
    const { error } = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
        confirm_password: Joi.ref('password'),
        mobile: Joi.string().required(),

    }).validate(req.body);

    if (error) {
        return res.status(400).json(error)
    }
    next();
}

module.exports = {
    loginValidator,
    registerValidator
}