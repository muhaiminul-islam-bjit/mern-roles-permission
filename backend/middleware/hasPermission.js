const Role = require('../models/Role');

const hasPermission = (action) => {
    return async (req, res, next) => {
        $roles = await Role.find({ websiteId: req.websiteId, _id: { $in: req.roles } });
        $roles.map((item) => {
            if (item.permissions.includes(action)) {
                next();
            } else {
                return res.status(403).json({ message: 'Not Allowed' })
            }
        })

    }
}

module.exports = hasPermission;