const {
  getAllUser,
  getUserById,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser,
} = require("../services/userService");
const notifControllers = require("./notificationsControllers");
const moment = require("moment-timezone");
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

// get pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 7;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// get paging data
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};

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
    await notifControllers.createNotif(req.user.id, {
      id: uuid(),
      usersId: req.user.id,
      message: `User dengan email ${email} ditambahkan oleh ${
        req.user.email
      } pada ${moment()
        .locale("id")
        .tz("Asia/Jakarta")
        .format("Do MMMM YYYY, h:mm:ss z")}`,
      isRead: false,
    });
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

// GET all user data role member with pagination
exports.getAllUserData = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const users = await getAllUser(limit, offset);
    if (!users) {
      res.status(404).json({
        status: "error",
        message: "Data not found",
        data: {},
      });
    }
    const response = getPagingData(users, page, limit);
    res.status(200).json({
      status: "success",
      message: "All User data with pagination retrieved successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      message: error.message,
      data: {},
    });
  }
};

// GET user data by id
exports.getUserDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      status: "success",
      message: "User data retrieved successfully",
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
    let {
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
    if (!email) {
      email = user.email;
    }
    if (email !== user.email) {
      const checkEmail = await getUserByEmail(email);
      if (checkEmail) {
        return res.status(400).json({
          status: "error",
          message: "Email already exist",
          data: {},
        });
      }
    }
    if (!phone) {
      phone = user.phone;
    }
    if (!role) {
      role = user.role;
    }
    if (!firstname) {
      firstname = user.firstname;
    }
    if (!lastname) {
      lastname = user.lastname;
    }
    if (!gender) {
      gender = user.gender;
    }
    if (!profile_image) {
      profile_image = user.profile_image;
    }
    // if password empty use old password else use new password
    if (!password) {
      password = user.password;
    } else {
      password = await encryptPassword(password);
    }

    const data = await updateUser(id, {
      firstname,
      lastname,
      gender,
      email,
      password,
      phone,
      role,
      profile_image,
    });
    //create notif
    await notifControllers.createNotif(req.user.id, {
      id: uuid(),
      usersId: req.user.id,
      message: `User dengan id: ${id} diupdate oleh ${
        req.user.email
      } pada ${moment()
        .locale("id")
        .tz("Asia/Jakarta")
        .format("Do MMMM YYYY, h:mm:ss z")}`,
      isRead: false,
    });
    // get user after update
    const userAfterUpdate = await getUserById(id);
    res.status(200).json({
      status: "success",
      message: "User data updated successfully",
      data: userAfterUpdate,
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
    await notifControllers.createNotif(req.user.id, {
      id: uuid(),
      usersId: req.user.id,
      message: `User dengan id: ${id} dihapus oleh ${
        req.user.email
      } pada ${moment()
        .locale("id")
        .tz("Asia/Jakarta")
        .format("Do MMMM YYYY, h:mm:ss z")}`,
      isRead: false,
    });
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
      data: id,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting user data",
      error,
    });
  }
};
