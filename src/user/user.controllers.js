const User = require("../models/user.model");
const { hashPassword } = require("../utils/crypto");

const findAllUser = async () => {
  const data = await User.find({ isActive: true });
  return data;
};

const findUserById = async (id) => {
  try {
    const data = await User.findById(id);
    return data;
  } catch (error) {
    return null;
  }
};

const findUserByEmail = async (email) => {
  const data = await User.findOne({ email: email.toLowerCase() });
  return data;
};

const createNewUser = async (userObj) => {
  const newUser = new User({
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email.toLowerCase(),
    password: hashPassword(userObj.password),
    profileImage: userObj.profileImage,
    phone: userObj.phone,
  });
  const data = await newUser.save();
  return data;
};

const updateUser = async (id, userObj) => {
  try {
    // Si hay password en el objeto, lo hasheamos
    if (userObj.password) {
      userObj.password = hashPassword(userObj.password);
    }

    const data = await User.findByIdAndUpdate(id, userObj, {
      new: true,
      runValidators: true,
    });

    return data ? 1 : 0;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const data = await User.findByIdAndDelete(id);
    return data ? 1 : 0;
  } catch (error) {
    return 0;
  }
};

module.exports = {
  findAllUser,
  findUserById,
  findUserByEmail,
  createNewUser,
  updateUser,
  deleteUser,
};
