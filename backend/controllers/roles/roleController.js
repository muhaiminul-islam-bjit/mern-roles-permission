const asyncHandler = require("express-async-handler");
const Role = require("../../models/Role");


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

const getById = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const roleId = req.query.id ?? null;
    if (roleId) {
        const role = await Role.findById({ _id: roleId, websiteId }).exec();
        return res.json(role);
    }
    return res.json({});
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
    const id = req.body.id ?? null;
    let duplicate;
    const websiteId = req.websiteId;
    if (!role || !permissions) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    if (id) {
        duplicate = await Role.findOne({ role, websiteId, _id: { $ne: id } });
        console.log(duplicate);
    } else {
        duplicate = await Role.findOne({ role, websiteId });
    }

    if (duplicate) {
        return res.status(400).json({
            message: "Duplicate role name"
        })
    };

    if (id) {
        const fetchedRole = await Role.findOne({ websiteId, _id: id }).exec();
        fetchedRole.role = role;
        fetchedRole.permissions = permissions;
        const roleUpdate = await fetchedRole.save();

        if (roleUpdate) {
            return res.status(201).json({ message: 'Role Updated' })
        } else {
            return res.status(400).json({ message: 'Invalid role data received' })
        }
    } else {
        const roleCreate = Role.create({ role, permissions, websiteId });
        if (roleCreate) {
            return res.status(201).json({ message: 'New role created' })
        } else {
            return res.status(400).json({ message: 'Invalid role data received' })
        }
    }





})

const deleteRole = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const { id } = req.body;
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
    deleteRole,
    getById
}
