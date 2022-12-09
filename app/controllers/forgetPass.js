const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const SALT = 10;
const jwt = require("jsonwebtoken");

const {
  getUserById,
  getUserByEmail,
  updateUser,
  getUserByToken,
} = require("../services/userService");

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

// forget password
exports.forgetPass = async (req, res) => {
  try {
    const { email } = req.body;
    // check email
    const user = await getUserByEmail(email);
    // if user not found
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "Email not found",
        data: {},
      });
      return;
    }

    // create token
    const token = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // updated user refresh token
    const updatedUser = await updateUser(user.id, { refresh_token: token });

    // create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: "binair242@gmail.com",
        pass: "dkqyukncpyycveqy",
      },
    });

    // create mail options
    const mailOptions = {
      from: "binair242@gmail.com",
      to: email,
      subject: "Reset Password",
      html: ` <center> 
              <h1>Reset Password</h1>
              <p>Click this link to reset your password</p>
              <button type="button" s><a href="http://localhost:8000/api/v1/reset-password/${token}">Reset Password</a></button>
              <center>
            `,
    };

    // send email
    await transporter.sendMail(mailOptions);

    res.status(200).send({
      status: "success",
      message: "Check your email to reset password",
      data: {},
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
      data: {},
    });
  }
};

// reset password
exports.resetPass = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    // check token
    const user = await getUserByToken(token);

    // check user
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "User not found",
        data: {},
      });
      return;
    }

    // check password
    if (password !== confirmPassword) {
      res.status(400).send({
        status: "error",
        message: "Password not match",
        data: {},
      });
      return;
    }

    // encrypt password
    const encryptedPassword = await encryptPassword(password);

    // update user password
    const updatedUser = await updateUser(user.id, {
      password: encryptedPassword,
    });

    // send response
    res.status(200).send({
      status: "success",
      message: "Password reset successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
      data: {},
    });
  }
};
