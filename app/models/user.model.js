const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    mobile: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    // toJSON: { virtuals: true } 
});

UserSchema.virtual('notes', {
    ref: 'Note',
    localField: '_id',
    foreignField: 'userId', // 'any id in the foreign table'
    justOne: false // set true for one-to-one relationship
})

UserSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'userId', // 'any id in the foreign table'
    justOne: false // set true for one-to-one relationship
})

UserSchema.pre('save', function (next) {
    const user = this;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);