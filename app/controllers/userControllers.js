const { getUserByRefreshToken } = require("../services/authService");
const {
  getUserByRoleMember,
  getUserById,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser,
} = require("../services/userService");

// user controller

const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const SALT = 10;
// ecrypt password
function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

// POST user data
exports.postUserData = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      email,
      password,
      phone,
      role,
      profile_image,
    } = req.body;
    // check email
    const user = await getUserByEmail(email);
    if (user) {
      res.status(400).send({
        message: "Email already exist",
      });
      return;
    }
    // encrypt password
    const encryptedPassword = await encryptPassword(password);

    const data = await createUser({
      id: uuid(),
      firstname,
      lastname,
      gender,
      email,
      password: encryptedPassword,
      phone,
      role,
      profile_image,
    });
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

// GET user data role member
exports.getUserDataMember = async (req, res) => {
  try {
    const users = await getUserByRoleMember();
    res.status(200).send({
      status: true,
      message: "Get all user data role member",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// PUT user data
exports.updateUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstname,
      lastname,
      gender,
      email,
      password,
      phone,
      role,
      profile_image,
    } = req.body;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // encrypt password
    const encryptedPassword = await encryptPassword(password);
    const data = await updateUser(id, {
      firstname,
      lastname,
      gender,
      email,
      password: encryptedPassword,
      phone,
      role,
      profile_image,
    });
    // get data after update
    const userAfterUpdate = await getUserById(id);
    res.status(200).json({
      message: "User data updated successfully",
      data: data,
      user: userAfterUpdate,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

// DELETE user data
exports.deleteUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteUser(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User data deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user data",
      error,
    });
  }
};
