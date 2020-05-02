const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['CREATED', 'IN-PROGRESS', 'COMPLETED'],
        default: 'CREATED'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);