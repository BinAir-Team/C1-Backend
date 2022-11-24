const userService = require('../services/userServices');
 
// user controller 

// GET user data
exports.getUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
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
    const user = await userService.updateUser(id, req.body);
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