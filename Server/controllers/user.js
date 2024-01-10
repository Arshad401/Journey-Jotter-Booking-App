import Users from "../models/Users.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await Users.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } });
    res.status(200).json("user has been deleted");
  } catch (err) {
    next(err);
  }
};

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await Users.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };

export const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find({ isDeleted: false });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const editAvatar = async (req, res) => {
  const { Avatar } = req.body;
  const id = req.params.id;
  const user = await Users.findOne({ _id: id });
  if (user) {
    await Users.findByIdAndUpdate(id, {
      $set: {
        avatar: Avatar,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Avatar updated successfully",
      data: user,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "updating avatar failed",
    });
  }
};
