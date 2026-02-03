const Memory = require("../models/Memory");

// GET /api/memories - Get all memories for the logged-in user
async function findMemories(req, res) {
    try {
        // Removed user id, all memories can be seen by all users
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }

        const memories = await Memory.find({});
        res.json(memories);
    } catch (err) {
        res.status(500).json(err);
    }
}

// POST /api/memories - Create a new memory
async function createMemory(req, res) {
    try {
        const memory = await Memory.create({
            user: req.user._id,
            title: req.body.title,
            contents: req.body.contents,
            image: req.body.image
        });
        res.status(201).json(memory);
    } catch (err) {
        res.status(400).json(err);
    }
}

// PUT /api/memories/:id - Update a memory
async function editMemory(req, res) {
    try {
        // This needs an authorization check
        if (!req.user) {
            return res.status(403).json({ message: "User is not authorized to update this memory." });
        } else {
            const record = await Memory.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const memory = await Memory.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!memory) {
                    return res.status(404).json({ message: 'No memory found with this id!' });
                }
                res.json(memory);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE /api/memories/:id - Delete a memory
async function deleteMemory(req, res) {
    try {
        // This needs an authorization check
        if (!req.user) {
            return res.status(403).json({ message: "User is not authorized to update this memory." });
        } else {
            const record = await Memory.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const memory = await Memory.findByIdAndDelete(req.params.id);
                if (!memory) {
                    return res.status(404).json({ message: 'No memory found with this id!' });
                }
                res.json({ message: 'Memory deleted!' });
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Find single memory by Id
async function findOneMemory(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        } else {
            // Removed user requirement so any memory can be seen by any user, delete and edit functions limited to user
            // const record = await Memory.findById(req.params.id);
            // if (record.user.toString() !== req.user._id.toString()) {
            //     return res.status(403).json({ message: 'User not authorized!' });
            // } else {
            const memory = await Memory.findById(req.params.id);
            if (memory) {
                res.json(memory);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    findMemories,
    createMemory,
    editMemory,
    deleteMemory,
    findOneMemory
};