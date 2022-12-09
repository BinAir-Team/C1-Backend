const { getUserByRefreshToken } = require("../services/authService");
const {
  getUserByRoleMember,
  getUserById,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser,
} = require("../services/userService");
const notifControllers = require('./notificationsControllers');
const moment = require('moment');
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
    const { firstname, lastname, gender, email, password, phone } = req.body;
    // check email
    const user = await getUserByEmail(email);
    if (user) {
      res.status(400).send({
        status: "error",
        message: "Email already exist",
        data: {},
      });
      return;
    }
    // encrypt password
    const encryptedPassword = await encryptPassword(password);
    //create notif
    await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message: `User dengan email ${email} ditambahkan oleh ${req.user.email} pada ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,isRead: false})      
    const data = await createUser({
      id: uuid(),
      firstname,
      lastname,
      gender,
      email,
      role: "member",
      password: encryptedPassword,
      phone,
      profile_image:
        "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
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
      data: {},
    });
  }
};

// GET user data role member
exports.getUserDataMember = async (req, res) => {
  try {
    const user = await getUserByRoleMember();
    res.status(200).send({
      status: "true",
      message: "Get all user data role member",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      message: error.message,
      data: {},
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
        status: "error",
        message: "User not found",
        data: {},
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
    //create notif
    await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message: `User dengan id: ${id} diupdate oleh ${req.user.email} pada ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,isRead: false})      
    // get data after update
    const userAfterUpdate = await getUserById(id);
    res.status(200).json({
      status: "success",
      message: "User data updated successfully",
      data: data,
      user: userAfterUpdate,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      data: {},
      user: {},
    });
  }
};

// DELETE user data
exports.deleteUserData = async (req, res) => {
  try {
    const id = req.params.id;
    await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message: `User dengan id: ${id} dihapus oleh ${req.user.email} pada ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,isRead: false})      
    const user = await deleteUser(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      status: "success",
      message: "User data deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting user data",
      error,
    });
  }
};
