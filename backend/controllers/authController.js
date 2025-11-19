import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/emailService.js';


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};


export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }


    const resetToken = crypto.randomBytes(32).toString('hex');


    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');


    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();


    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;


    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2d6a4f; text-align: center;">🌿 PlantHub Password Reset</h2>
        <p>Hi ${user.name},</p>
        <p>You requested to reset your password for your PlantHub account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #2d6a4f; 
                    color: white; 
                    padding: 14px 30px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    display: inline-block;
                    font-weight: bold;">
            Reset My Password
          </a>
        </div>
        <p style="color: #666;">Or copy and paste this link:</p>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all;">
          ${resetUrl}
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 14px;">
          ⏰ This link will expire in 10 minutes.<br>
          🔒 If you didn't request this, please ignore this email.
        </p>
        <p style="color: #2d6a4f; font-weight: bold;">Happy Planting! 🌱</p>
      </div>
    `;

    try {

      await sendEmail({
        email: user.email,
        subject: 'PlantHub - Reset Your Password',
        html: message
      });

      res.json({ 
        message: 'Password reset email sent! Please check your inbox.' 
      });
    } catch (error) {

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      console.error('Email sending failed:', error);
      return res.status(500).json({ 
        message: 'Email could not be sent. Please try again later or contact support.' 
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters' 
      });
    }

 
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');


    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired reset link. Please request a new one.' 
      });
    }


    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ 
      message: 'Password reset successful! You can now login with your new password.' 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};


export const updateAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses = req.body.addresses;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};