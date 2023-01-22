const asyncHandler = require("express-async-handler");
const Role = require("../../models/Role");

/**
 * @desc Get all roles
 * @route GET /roles
 * @access Private
 */
const getAllRoles = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const roles = await Role.find({ websiteId: websiteId }).exec();
    // console.log(roles)
    const formattedRoles = roles.map((item) => ({
        role: item.role,
        permissions: item.permissions
    }));

    res.json({ data: formattedRoles });
});

const getRolesForSelect = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const roles = await Role.find({ websiteId: websiteId }).exec();
    const formattedRoles = roles.map((item) => {
        return {
            label: item.role,
            value: item._id
        }
    });

    res.json(formattedRoles);
});

const createRole = asyncHandler(async (req, res) => {
    const { role, permissions } = req.body;
    const websiteId = req.websiteId;
    if (!role || !permissions) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const roleCreate = Role.create({ role, permissions, websiteId });

    if (roleCreate) {
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

module.exports = {
    getRolesForSelect,
    getAllRoles,
    createRole
}
