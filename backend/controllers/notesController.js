const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler');
const Role = require('../models/Role');
const Website = require('../models/Website');
const Store = require('../models/Store');
const bcrypt = require("bcrypt");

/**
 * @desc Get all notes 
 * @route GET /notes
 * @access Private
 *  */
const getAllNotes = asyncHandler(async (req, res) => {
    const websiteObj = { phone: '01681319233', websiteName: 'Owner', active: true };
    const website = await Website.create(websiteObj);

    const storeObj = { storeName: 'Owner Store', websiteId: website._id, active: true };
    const store = await Store.create(storeObj);

    const role = {
        role: "admin",
        permissions: [
            "createUser", "updateUser", "deleteUser", "viewUser"
        ],
        websiteId: website._id,
    };
    const roleObj = await Role.create(role);

    const hashedPwd = await bcrypt.hash('muhaimin123!@#', 10);
    const userObject = { username: 'muhaimin', password: hashedPwd, roles: [roleObj._id], websiteId: website._id, storeId: store._id, };
    const user = await User.create(userObject);



    res.json({ message: "Basic setup complete" });
})

/**
 * @desc Create all notes 
 * @route POST /notes
 * @access Private
 *  */
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, title, text })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

/**
 * @desc Update all notes 
 * @route PATCH /notes
 * @access Private
 *  */
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)
})

/**
 * @desc Delete all notes 
 * @route DELETE /notes
 * @access Private
 *  */
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}