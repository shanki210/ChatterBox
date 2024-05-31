import { generateToken } from "../config/generateToken.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const handleSignup = asyncHandler(async (req,res)=>{
    const {name,email,password,pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const user = await User.findOne({email});
    if(user){
        res.status(400);
        throw new Error("User already exists");
    }

    const newUser = await User.create({
        name,
        email,
        password,
        pic
    });
    const token = generateToken(newUser._id)
    if(newUser){
        return res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            pic:newUser.pic,
            token:token
    })}else{
        res.status(400);
        throw new Error("User not found");
    }
})



export const handleLogin = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if( !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("User doesn't exists");
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        res.status(400);
        throw new Error("Invalid Credentials");
    }
    const token = generateToken(user._id)
    if(user){
        return res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:token
    })}else{
        res.status(400);
        throw new Error("User not found");
    }
})

export const getUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    //  const users = await User.find(keyword)
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });