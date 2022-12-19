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

    // create update token
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

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
      html: `   <center> 
      <h1>Reset Password</h1>
      <p>Click this link to reset your password</p>
      <button 
        style=
        "
          border: none;
          transition-duration: 0.4s;
          cursor: pointer;
          background-color: #76b5c3;
          border-radius: 12px;
        "
        type="button"
      > 
        <a 
        style=
        "
        text-decoration: none;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;color: white;
        padding: 16px 32px;
        transition-duration: 0.4s;" 
        href='http://binair-backend-production.up.railway.app/api/v1/reset-password/${token}' target="_blank" rel="reset">Reset Password</a>
      </button>
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

// reset pass view
exports.resetPassView = async (req, res) => {
  try {
    // get token from url
    const token = req.params.token;

    // verify token
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // get user by id
    const user = await getUserById(decodedUser.id);

    // check user
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "Token reset password not found",
        data: {},
      });
      return;
    }
    res.status(200).render("resetPassword", {
      status: "success",
      message: "reset password view",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      status: "invalid",
      message: "Invalid token reset password",
      data: {},
    });
  }
};

// reset password
exports.resetPass = async (req, res) => {
  const { password, confirmPassword } = req.body;
  try {
    const token = req.body.token;
    // verify token
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // get user by id
    const user = await getUserById(decodedUser.id);

    // check user
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "Token reset password not found",
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
    res.status(200).render("resetSucces", {
      status: "success",
      message: "reset password success",
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
