const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const authToken = (user) => {
    const secrect = process.env.JWT_SECRECT_KEY;
    const access_token = jwt.sign(
        {
            id: user._id
        },
        secrect,
        {
            expiresIn: '1h'
        }
    );

    const refresh_token = jwt.sign(
        {
            email: user.email
        },
        secrect,
        {
            expiresIn: '2 days'
        }
    );

    return {
        access_token, refresh_token

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
    compareSync
}