const Joi = require('@hapi/joi');

const todoValidator = (req, res, next) => {
    const { error } = Joi.object({
        title: Joi.string().min(8).required(),
        content: Joi.string().min(8).required(),
    }).validate(req.body);

    if (error) {
        next({ err: error })
    }
    next();
}


module.exports = {
    todoValidator
}