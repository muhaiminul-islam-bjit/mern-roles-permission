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
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

/**
 * @desc Create new user
 * @route POST /users
 * @access Private
 */
const createNewUser = asyncHandler(async (req, res) => {
  let { username, password, roles, phone, websiteName, storeName } = req.body;

  if (!Array.isArray(roles)) {
    roles = ["SuperAdmin"];
  }

  if (!username) {
    return res.status(400).json({ message: "UserName required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }

  if (!roles.length) {
    return res.status(400).json({ message: "Roles required" });
  }

  const duplicate = await User.findOne({ username });
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  const websiteObj = { phone, websiteName, active: false };
  const website = await Website.create(websiteObj);

  const storeObj = { storeName, websiteId: website._id, active: true };
  const store = await Store.create(storeObj);

  const hashedPwd = await bcrypt.hash(password, 10); //salt round
  const userObject = { username, password: hashedPwd, roles, websiteId: website._id, storeId: store._id, };
  const user = await User.create(userObject);
  console.log(user);



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
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
