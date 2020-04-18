const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        requoired: true
    },
    email: {
        type: String,
        requoired: true
    },
    phone: {
        type: String,
        requoired: true
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

module.exports = mongoose.model('User', UserSchema);