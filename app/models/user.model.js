const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', UserSchema);