import mongoose from 'mongoose';
import UserModel from '../models/user.js'; 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
const secret = 'uzefa'


 export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email: email });

        if (oldUser) {
           return res.status(409).json({ message: 'User already exists with this email', status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = {
            username, email, password: hashedPassword
        }

        const savedUser = await UserModel.create(newUser);
        const token = jwt.sign({ email: email, id: savedUser._id }, secret, { expiresIn: '7d' })
       return res.status(200).json({ message: 'User created successfully', savedUser, token, status: 200 });

    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: "Internal Server Error", error: error, status: 500 })
    }
}

 export const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const oldUser = await UserModel.findOne({ email: email });
        if (oldUser == null) {
           return res.status(404).json({ message: 'User not found , please proceed to Sign Up', status: 404 })
        }
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (isPasswordCorrect == false) {
           return res.status(401).json({ message: 'Invalid login credentials', status: 401 })
        }

        const token = jwt.sign({ email: email, id: oldUser._id }, secret, { expiresIn: '7d' })
       return res.status(200).json({ message: 'Logged in successfully', oldUser, token, status: 200 });
    } catch (error) {
       return res.status(500).json({ message: "Internal Server Error", error: error, status: 500 })
        console.log(error);
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await user.find(); 
        console.log(users);
       return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
       return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    console.log(req.body);
    try { 
        const newUser = new user(req.body); 
        await newUser.save(); 
       return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
       return res.status(500).json({ message: error.message });
    }
};


