const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const SALT = 10;

const {
  getUserById,
  getUserByEmail,
  updateUser,
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
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "Email not found",
        data: {},
      });
      return;
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "binair242@gmail.com",
        pass: "XA9c7zsnHkNatb10",
      },
    });
    const mailOptions = {
      from: "binair242@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<h1>Reset Password</h1>
      <p>Click this <a href="http://localhost:8000/reset/${user.id}">link</a> to reset your password</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).send({
      status: "success",
      message: "Email sent",
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

exports.resetPass = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;
    const user = await getUserById(id);
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "User not found",
        data: {},
      });
      return;
    }
    if (password !== confirmPassword) {
      res.status(400).send({
        status: "error",
        message: "Password not match",
        data: {},
      });
      return;
    }
    const encryptedPassword = await encryptPassword(password);
    const data = {
      password: encryptedPassword,
    };
    const result = await updateUser(id, data);
    res.status(200).send({
      status: "success",
      message: "Password has been changed",
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
