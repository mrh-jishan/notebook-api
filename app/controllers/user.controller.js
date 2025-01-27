const User = require('../models/user.model');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    // Create a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find().populate('notes').lean().exec((err, users) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        }
        return res.status(200).json(users)
    })
};

// Find a single user with a userId
exports.findOne = (req, res) => {

    User.findById(req.params.userId).populate('notes').lean().exec((err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        }

        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(200).json(user)
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};
