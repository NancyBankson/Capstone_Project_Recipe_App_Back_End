const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// GET /api/users/auth - Get all users for the logged-in user
async function findUsers(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }

        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.exists({ email: email });
        if (userExists) {
            return req.status(400).json({ message: 'User with that email already exists.' });
        }
        const newUser = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: "Failed to create user.", details: error.message });
    }
}

async function userLogin(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const correctPw = await user.isCorrectPassword(req.body.password);

        if (!correctPw) {
            console.log("Incorrect email or password");
            return res.status(400).json({ message: "Incorrect email or password" });
        } else {
            const secret = process.env.JWT_SECRET;
            const expiration = '2h'; // Token will be valid for 2 hours

            // In your user login logic...
            const user = await User.findOne({ email: req.body.email });
            // ... (password verification logic) ...

            // The payload should contain non-sensitive user data
            const payload = {
                _id: user._id,
                username: user.username,
                email: user.email,
            };

            const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
            // Example token: eyJhbGciOi...

            // Send the token back to the client
            res.json({ token, user });
        }

        // If both are true, the user is authenticated!
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(400).json({ error: "Failed to authenticate user.", details: error.message });
    }
}

async function changePassword(req, res) {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Fetch User
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Verify old password
        const correctPw = await user.isCorrectPassword(oldPassword);

        if (!correctPw) {
            console.log("Incorrect email or password");
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        // Check for password mismatch
        if (newPassword != confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // New password is hashed in the User model

        // Update database with new password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.log("Error at catch");
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    findUsers,
    createUser,
    userLogin,
    changePassword
};