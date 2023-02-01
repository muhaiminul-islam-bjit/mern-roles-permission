const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Website = require("../models/Website");
const Store = require("../models/Store");

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const websiteId = req.websiteId;
  const pageNumber = (parseInt(req.query.pageNumber) - 1) || 0;
  const limit = parseInt(req.query.limit) || 12;
  const totalUsers = await User.countDocuments().exec();
  let startIndex = pageNumber * limit;
  console.log(pageNumber)
  const users = await User.find({ websiteId: websiteId })
    .select("-password").populate('websiteId storeId')
    .skip(startIndex).limit(limit)
    .sort({ _id: -1 }).exec();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  let formattedUser = users.map((user) => {
    return {
      username: user.username,
      store: user.storeId.storeName,
      websitePhone: user.websiteId.phone,
      status: user.active,
      id: user._id
    }
  })
  formattedUser.totalUsers = totalUsers;
  const formattedData = {
    data: formattedUser,
    total: totalUsers,
  }
  console.log(formattedData)
  res.json(formattedData);
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
  const { id, username, roles, active, password } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

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
};
