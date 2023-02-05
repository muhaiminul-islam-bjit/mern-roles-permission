const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const websiteId = req.websiteId;
  const pageNumber = (parseInt(req.query.pageNumber) - 1) || 0;
  const limit = parseInt(req.query.limit) || 12;
  const search = req.query.search;
  const startIndex = pageNumber * limit;


  const totalUsers = await User.countDocuments({ websiteId: websiteId }).exec();
  const users = await User.find({
    websiteId: websiteId, $or: [
      { "phone": { $regex: '.*' + search + '.*', $options: 'i' } },
      { "username": { $regex: search, $options: 'i' } },
    ]
  })
    .select("-password").populate('websiteId storeId roles')
    .skip(startIndex).limit(limit)
    .sort({ _id: -1 }).exec();
  if (!users?.length) {
    res.json({
      data: [],
      total: totalUsers,
    });
  }

  let formattedUser = users.map((user) => {
    return {
      username: user.username,
      store: user.storeId.storeName,
      phone: user.phone,
      status: user.active,
      roles: user.roles,
      id: user._id
    }
  })

  res.json({
    data: formattedUser,
    total: totalUsers,
  });
});

/**
 * @desc Get user by ID
 * @route GET /users/getById
 * @access Private
 */
const getUserById = asyncHandler(async (req, res) => {
  const websiteId = req.websiteId;
  const userId = req.query.id;

  const user = await User.findOne({ websiteId: websiteId, _id: userId }).populate('roles').select("-password").exec();
  console.log(user)
  return res.json({
    data: user
  });
});

/**
 * @desc Create new user
 * @route POST /users
 * @access Private
 */
const createNewUser = asyncHandler(async (req, res) => {
  const websiteId = req.websiteId;
  let { username, password, roles, storeId, phone } = req.body;

  console.log(req.body);

  if (!username) {
    return res.status(400).json({ message: "UserName required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }

  if (!roles?.length) {
    return res.status(400).json({ message: "Roles required" });
  }

  const duplicate = await User.findOne({ $or: [{ username }, { phone }] });
  if (duplicate) {
    return res.status(400).json({ message: "Duplicate username or phone" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashedPwd, roles, websiteId: websiteId, storeId: storeId, phone };
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

/**
 * @desc Update a user
 * @route PATCH /users
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {
  const { id, roles } = req.body;

  if (
    !id ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.roles = roles;

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

/**
 * @desc Delete a user
 * @route DELETE /users
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    console.log("muhaimin")
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(reply);
},);

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserById
};
