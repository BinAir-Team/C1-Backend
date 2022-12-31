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
const moment = require("moment-timezone");
const SALT = 10;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "214017739948-b18qptodbi5i0sth8fgukauks2raoi61.apps.googleusercontent.com"
);
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

    // check email and password is not empty'
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password is required",
        data: {},
      });
    }
    // validator email format using regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Email format is invalid",
        data: {},
      });
    }

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
      message: `User Sukses Registrasi pada ${moment()
        .locale("id")
        .tz("Asia/Jakarta")
        .format("Do MMMM YYYY, h:mm:ss z")}`,
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
    // create token expired 1 day
    const accessToken = jwt.sign(
      { id, firstname, lastname, gender, email, phone, role, profile_image },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
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
      message: `Sukses Login pada ${moment()
        .locale("id")
        .tz("Asia/Jakarta")
        .format("Do MMMM YYYY, h:mm:ss z")}`,
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
    message: `Sukses Update Profile Pada ${moment()
      .locale("id")
      .tz("Asia/Jakarta")
      .format("Do MMMM YYYY, h:mm:ss z")}`,
    isRead: false,
  });
  try {
    // get data
    let { firstname, lastname, gender, phone, profile_image } = req.body;

    // check if data is emptys
    if (!profile_image) {
      profile_image = user.profile_image;
    }

    if (!firstname) {
      firstname = user.firstname;
    }

    if (!gender) {
      gender = user.gender;
    }

    if (!lastname) {
      lastname = user.lastname;
    }

    if (!phone) {
      phone = user.phone;
    }

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
      status: "error",
      message: "Update current user failed",
      error: error.message,
      data: {},
    });
  }
};

// put current user password
exports.putCurrentUserPassword = async (req, res) => {
  const user = await getUserById(req.user.id);
  // user not found
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "User not found ",
      data: {},
    });
  }
  try {
    // get data from body old new confirm
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // check if password match
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "error",
        message: "Old password is wrong",
        data: {},
      });
    }
    // check if new password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "New password and confirm password not match",
        data: {},
      });
    }
    //  hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // update user
    const updatedUser = await updateUser(user.id, {
      password: hashedPassword,
    });
    // send response
    res.status(200).json({
      status: "success",
      message: "User new password updated",
      data: {},
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

// Google Login
exports.googleLogin = async (req, res) => {
  try {
    // jwt encoded token
    const { token, first_name, last_name, profile_picture } = req.body;
    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Token is required",
        data: {},
      });
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "214017739948-b18qptodbi5i0sth8fgukauks2raoi61.apps.googleusercontent.com",
    });
    const { given_name, family_name, email, picture } = ticket.getPayload();
    let user = await getUserByEmail(email);
    if (!user)
      user = await createUser({
        id: uuid(),
        email,
        firstname: given_name ? given_name : first_name,
        lastname: family_name ? family_name : last_name,
        profile_image: picture ? picture : profile_picture,
        role: "member",
        verified: true,
      });
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      status: "success",
      message: "Login Success",
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        profile_image: user.profile_image,
        email: user.email,
        role: user.role,
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
