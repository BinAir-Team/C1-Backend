const {getUserByRefreshToken} = require('../services/authService');
const { getUserByRoleMember, getUserById, getUserByEmail, updateUser, createUser, deleteUser } = require('../services/userService');
 
// user controller 

// POST user data
exports.postUserData = async (req, res) => {
  const { firstname, lastname, gender, email, password, phone, role, profile_image } = req.body;
  try {
    const user = await createUser({
      firstname,
      lastname,
      gender,
      email,
      password,
      phone,
      role,
      profile_image
    });
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    });
  }
}

// GET user data role member
exports.getUserDataMember = async (req, res) => {
    try {
        const users = await getUserByRoleMember();
        res.status(200).send({
            status: true,
            message: 'Get all user data role member',
            data: users
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
}

// GET user data
exports.getUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: 'User data retrieved successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving user data',
      error
    });
  }
}

// PUT user data
exports.updateUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: 'User data updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user data',
      error
    });
  }
}

// DELETE user data
exports.deleteUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteUser(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: 'User data deleted successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user data',
      error
    });
  }
}