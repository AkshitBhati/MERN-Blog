import User from "../modals/user.modal.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

const test = (req, res) => {
    res.json({message:"API is working"})
}

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.hashPassword) {
      if (req.body.hashPassword.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters'));
      }
      req.body.hashPassword = bcryptjs.hashSync(req.body.hashPassword, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, 'Username must be between 7 and 20 characters')
        );
      }
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Username can only contain letters and numbers')
        );
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.hashPassword,
          },
        },
        { new: true }
      );
      const { hashPassword, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.userId){
      return next(errorHandler(403, 'You are not allowed to delete this account'))
    }
    try{
      await User.findByIdAndDelete(req.params.userId)
      res.status(200).json('User has been deleted')
    }
    catch(err){
      next(err)
    }
  }

  const signout = async(req, res, next) => {
    try{
      res.clearCookie('access-token').status(200).json('User has been signed out')
    }
    catch(err){
      next(err)
    }
  }
export { test, updateUser, deleteUser, signout }