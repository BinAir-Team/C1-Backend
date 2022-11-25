const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getUserByRefreshToken} = require('../services/authService');
const { getUserByRoleMember, getUserById, getUserByEmail, updateUser, createUser, deleteUser } = require('../services/userService');
const {v4:uuid} = require('uuid');

// auth controller exports

//  Register Role Member
exports.registerMember = async (req, res) => {
    try {
        const { firstname, lastname, gender, email, password, confirmPassword, phone } = req.body;
        // check if email already exist
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).json({
                message: 'Email already exist'
            });
        }
        // check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Password and confirm password does not match'
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const data = {
            id : uuid(),
            firstname,
            lastname,
            gender,
            email,
            password: hashedPassword,
            phone,
            role: 'member',
            profile_image: 'default.png'
        };
        const newUser = await createUser(data);
        // send response
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
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
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Register Failed',
            error: error.message
        });
    }
}

// Login 
exports.login = async (req, res) => {
  const { email:emailBody, password } = req.body;  
  try {
        // check if email exist
        const user = await getUserByEmail(emailBody);
        if (!user) {
            return res.status(400).json({
                message: 'Email not found'
            });
        }
        // check if password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Password is incorrect'
            });
        }
        const { id, email, role } = user;
        // create token
        const accessToken = jwt.sign({ id, email, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id, email, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        const updatedUser = await updateUser(user.id, { refreshToken });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        });
        const data = {
          id: updatedUser.id,
          firstname: updatedUser.firstname,
          lastname: updatedUser.lastname,
          email: updatedUser.email,
          role: updatedUser.role,
          profileImage: updatedUser.profileImage,
        };
        res.status(200).json({
          status: "success",
          message: "Login success",
          data: {
            accessToken,
            user: data,
          },
        });
  } catch (error) {
    res.status(500).json({
      message: 'Login Failed',
      error: error.message
    });
  }
}

// Logout
exports.logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(203).json({
        status: "error",
        message: "No token found",
      });
    }
    const user = await getUserByRefreshToken(token);
    if (!user) {
      return res.status(203).json({
        status: "error",
        message: "User not found",
      });
    }
    const updatedUser = await updateUser(user.id, { refreshToken: null });
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
      message: 'Logout Failed',
      error: error.message
    });
  }
}