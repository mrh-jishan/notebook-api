const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const access_key = process.env.JWT_ACCESS_KEY;
const refresh_key = process.env.JWT_REFRESH_KEY;

const authToken = (user) => {
    const access_token = jwt.sign({ id: user._id }, access_key, { expiresIn: '1h' });
    const refresh_token = jwt.sign({ email: user.email }, refresh_key, { expiresIn: '2 days' });
    return { access_token, refresh_token }
}

const verifyAccessToken = (req, res, next) => {
    try {
        var payload = jwt.verify(req.headers.token, access_key);
        req.user = {
            id: payload.id
        }
        next()
    } catch (err) {
        console.log("error", err);

        res.status(500).json(err);
    }
}

const verifyRefreshToken = (req, res, next) => {
    try {
        var payload = jwt.verify(req.headers.token, refresh_key);
        res.locals.auth = req.payload.email;
        console.log('payload: ', payload);
        next()
    } catch (err) {
        console.log('errir', err);

        res.status(500).json(err);
    }
}

const hashSync = (password) => {
    return bcrypt.hashSync(password, salt);
}

const compareSync = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    authToken,
    hashSync,
    compareSync,
    verifyAccessToken,
    verifyRefreshToken
}