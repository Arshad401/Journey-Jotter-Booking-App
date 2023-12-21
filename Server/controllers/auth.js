import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUSer = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUSer.save();
    res.status(200).send("user has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));

    const isPaswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPaswordCorrect)
      return next(createError(400, "wrong password or user name!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next)=>{
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign(
        { id: user._id},process.env.JWT_TOKEN);
        const { password: pass, ...rest } = user._doc 
        res
      .cookie("access_token", token, {
        httpOnly: true,})
        .status(200)
        .json({success:"loginsucess",
          rest});
    }else{
       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
       const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
       const newUSer = new User({ username: req.body.name.split(" ").join(" ").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email ,
      password: hashedPassword, avatar:req.body.photo });
      await newUSer.save();
      const token = jwt.sign(
        { id: newUSer._id},process.env.JWT_TOKEN);
        const { password: pass, ...rest } = newUSer._doc;
        res.cookie("access_token", token, {
          httpOnly: true,})
          .status(200)
          .json({success:"signupsucess"
            ,rest});


    }
    
  } catch (error) {
    next(error)
  }
}
