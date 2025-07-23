const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
// Login Route
// Login Route
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username, email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/request-reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 10; // valid for 10 minutes
    await user.save();

    const resetLink = `http://127.0.0.1:5500/ResetPassword.html?token=${token}&email=${email}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: '"DreamPath" <dreampath91@gmail.com>',
      to: email,
      subject: "Reset Your DreamPath Password",
      html: `
        <h3>Hi ${email},</h3>
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <a href="${resetLink}" style="padding:10px 20px; background-color:#c3749c; color:white; text-decoration:none; border-radius:8px;">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset link sent to email' });

  } catch (err) {
    console.error("🚨 Reset email error:", err);
    res.status(500).json({ message: "Error sending email", error: err.message });
  }
});


/*
router.post("/request-reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ username: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 1000 * 60 * 10; // 10 minutes

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    const resetLink = `http://localhost:5500/reset-password.html?token=${token}&email=${email}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: '"Study Abroad Team" <your-email@gmail.com>',
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click the link below to reset your password (valid for 10 minutes):</p>
             <a href="${resetLink}">${resetLink}</a>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email", error: err.message });
  }
});
*/
router.post("/ResetPassword", async (req, res) => {
  const { email, token, newPassword } = req.body;
  console.log("Reset Password Request:", { email, token, newPassword });
  try {
    const user = await User.findOne({
      email: email,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/consultancy", async (req, res) => {
  const data = req.body;
  try {
    const existing = await Consultancy.findOne({ userEmail: data.userEmail });

    if (existing) {
      await Consultancy.findOneAndUpdate({ userEmail: data.userEmail }, data);
      return res.status(200).json({ message: "Consultancy updated" });
    }

    await Consultancy.create(data);
    res.status(201).json({ message: "Consultancy saved" });

  } catch (err) {
    console.error("Error saving consultancy:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
