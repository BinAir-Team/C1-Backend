const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUserByToken,
  updateUserRefreshToken,
} = require("../services/authService");
const {
  getUserById,
  getUserByEmail,
  updateUser,
  createUser,
  getVerifiedStatus,
} = require("../services/userService");
const { v4: uuid } = require("uuid");
const { users } = require("../models");
const SALT = 10;
const notifControllers = require("./notificationsControllers");
const notifService = require("../services/notifService");
const { sendEmailVerification } = require("./emailVerification");

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

// check password
function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

// auth controller exports

//  Register Role Member
exports.registerMember = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      email,
      password,
      confirmPassword,
      phone,
    } = req.body;
    // check if email already exist
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Email already exist",
        data: {},
      });
    }
    // check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Password and confirm password does not match",
        data: {},
      });
    }
    // hash password
    const encryptedPassword = await encryptPassword(password);
    // create user
    const data = {
      id: uuid(),
      firstname,
      lastname,
      gender,
      email,
      password: encryptedPassword,
      phone,
      role: "member",
      profile_image:
        "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
    };
    await notifService.createNotif({
      id: uuid(),
      usersId: data.id,
      message: `User Sukses Registrasi pada ${moment().format(
        "MMMM Do YYYY, h:mm:ss a"
      )}`,
      isRead: false,
    });
    const newUser = await createUser(data);
    // send email verification
    await sendEmailVerification(req, res);
    // send response
    res.status(201).json({
      status: "success",
      message: "Register member success, check email for verification",
      data: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        gender: newUser.gender,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        role: newUser.role,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Register Failed",
      error: error.message,
      data: {},
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email: emailbody, password } = req.body;
    // check if email exist
    const user = await getUserByEmail(emailbody);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Email does not exist",
        data: {},
      });
    }
    // check if password match
    const isPasswordCorrect = await checkPassword(user.password, password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "error",
        message: "Password is incorrect",
        data: {},
      });
    }
    const {
      id,
      firstname,
      lastname,
      gender,
      email,
      phone,
      role,
      profile_image,
    } = user;
    // create token
    const accessToken = jwt.sign(
      { id, firstname, lastname, gender, email, phone, role, profile_image },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    //check if email verified
    const isEmailVerified = await getVerifiedStatus(email);
    if (!isEmailVerified.verified) {
      await sendEmailVerification(req, res);
      return res.status(401).json({
        status: "error",
        message: "Email not verified, check your email!",
        data: {},
      });
    }
    await notifControllers.createNotif(id, {
      id: uuid(),
      usersId: id,
      message: `Sukses Login pada ${moment().format(
        "MMMM Do YYYY, h:mm:ss a"
      )}`,
      isRead: false,
    });
    res.status(200).json({
      status: "success",
      message: "Login success",
      data: {
        id,
        firstname,
        lastname,
        gender,
        email,
        phone,
        role,
        profile_image,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Login Failed",
      error: error.message,
      data: {},
    });
  }
};

// get Current User By id
exports.getCurrentUserData = async (req, res) => {
  try {
    // found user req user id
    const user = await getUserById(req.user.id);
    // user not found
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found ",
        data: {},
      });
    }
    // send response
    res.status(200).json({
      status: "success",
      message: "User found",
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profile_image,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Get current user failed",
      error: error.message,
      data: {},
    });
  }
};

// put current user
exports.putCurrentUserData = async (req, res) => {
  const user = await getUserById(req.user.id);
  // user not found
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "User not found ",
      data: {},
    });
  }
  //set notif
  await notifControllers.createNotif(req.user.id, {
    id: uuid(),
    usersId: req.user.id,
    message: `Sukses Update Profile Pada ${moment().format(
      "MMMM Do YYYY, h:mm:ss a"
    )}`,
    isRead: false,
  });
  try {
    // get data
    const { firstname, lastname, gender, phone, profile_image, password } =
      req.body;

    //  hash password
    const encryptedPassword = await encryptPassword(password);
    // update user
    const updatedUser = await updateUser(user.id, {
      firstname,
      lastname,
      gender,
      phone,
      profile_image,
      password: encryptedPassword,
    });
    // send response
    res.status(200).json({
      status: "success",
      message: "User updated",
      data: {
        id: updatedUser.id,
        firstname,
        lastname,
        gender,
        phone,
        profile_image,
        password: encryptedPassword,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Update current user failed",
      error: error.message,
      data: {},
    });
  }
};
