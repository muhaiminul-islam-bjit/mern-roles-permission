const asyncHandler = require("express-async-handler");
const Role = require("../../models/Role");

/**
 * @desc Get all roles
 * @route GET /roles
 * @access Private
 */
const getAllRoles = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const roles = await Role.find({ websiteId: websiteId }).sort({ _id: -1 }).exec();
    const formattedRoles = roles.map((item) => ({
        id: item._id,
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

    const duplicate = await Role.findOne({ role, websiteId });
    console.log(duplicate)

    if (duplicate) {
        return res.status(400).json({
            message: "Duplicate role name"
        })
    };

    const roleCreate = Role.create({ role, permissions, websiteId });

    if (roleCreate) {
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

const deleteRole = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const { id } = req.body;
    console.log(req.body);
    const role = await Role.findById({ _id: id, websiteId }).exec();
    

    if (!role) {
        return res.status(400).json({ message: "Role not found" });
    }

    const result = await role.deleteOne();
    const reply = `Role ${result.role} with ID ${result._id} deleted`;
    res.json(reply);
})

module.exports = {
    getRolesForSelect,
    getAllRoles,
    createRole,
    deleteRole
}
