const Joi = require('@hapi/joi');

const noteValidator = (req, res, next) => {
    const { error } = Joi.object({
        title: Joi.string().min(8).required(),
        content: Joi.string().min(8).required(),
    }).validate(req.body);

    if (error) {
        return res.status(400).json(error)
    }
    next();
}


module.exports = {
    noteValidator
}