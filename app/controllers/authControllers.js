const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUserByToken,
  updateUserRefreshToken,
} = require("../services/authService");
const {
  getUserByRoleMember,
  getUserById,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser,
} = require("../services/userService");
const { v4: uuid } = require("uuid");
const { users } = require("../models");
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
        message: "Email already exist",
      });
    }
    // check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password does not match",
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
      profile_image: "default.png",
    };
    const newUser = await createUser(data);
    // send response
    res.status(201).json({
      status: "success",
      message: "User created successfully",
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
      message: "Register Failed",
      error: error.message,
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
        message: "Email does not exist",
      });
    }
    // check if password match
    const isPasswordCorrect = await checkPassword(user.password, password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }
    console.log("Email and Password is correct");
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
    const refreshToken = jwt.sign(
      { id, firstname, lastname, gender, email, phone, role, profile_image },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    // update user
    const updatedUser = await updateUser(user.id, {
      refresh_token: refreshToken,
    });
    // send response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
      message: "Login Failed",
      error: error.message,
    });
  }
};

// get current user
exports.getCurrentUser = async (req, res) => {
  // token not found
  if (!req.cookies.refreshToken) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
  try {
    // get token
    const token = req.cookies.refreshToken;
    const user = await getUserByToken(token);
    // user not found
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found ",
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
      message: "Get current user failed",
      error: error.message,
    });
  }
};

// put current user
exports.putCurrentUser = async (req, res) => {
  // token not found
  if (!req.cookies.refreshToken) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
  // get token
  const token = req.cookies.refreshToken;
  const user = await getUserByToken(token);
  // user not found
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "User not found ",
    });
  }
  try {
    // get data
    const { firstname, lastname, gender, phone, profile_image } = req.body;
    // update user
    const updatedUser = await updateUser(user.id, {
      firstname,
      lastname,
      gender,
      phone,
      profile_image,
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
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Update current user failed",
      error: error.message,
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // get token
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(203).json({
        status: "error",
        message: "No token found",
      });
    }
    // get user by refresh token
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(203).json({
        status: "error",
        message: "User not found",
      });
    }
    // update user
    const updatedUser = await updateUser(user.id, { refresh_token: null });

    // send response
    res.clearCookie("refreshToken");
    res.status(200).json({
      status: "success",
      message: "Logout success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout Failed",
      error: error.message,
    });
  }
};
