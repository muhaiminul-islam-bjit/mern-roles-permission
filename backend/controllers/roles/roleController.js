const asyncHandler = require("express-async-handler");
const Role = require("../../models/Role");

/**
 * @desc Get all roles
 * @route GET /roles
 * @access Private
 */
const getAllRoles = asyncHandler(async () => {
    const roles = Role.find().exec();
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

module.exports = {
    getRolesForSelect
}
