const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const consultancyRoutes = require('./routes/consultancy.js');
app.use('/api', consultancyRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Import other routes (if any)
const authRoutes = require('./routes/auth'); 
app.use('/api', authRoutes);

// ✅ Fix for OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dreampath91@gmail.com',  // your Gmail
      pass: 'opmp omhb bvin yzbi'     // your Gmail App Password
    }
  });

  const mailOptions = {
    from: email,
    to: 'dreampath91@gmail.com',
    subject: `Query from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
});


//Aboutus Contacting
app.post("/api/contact", async (req, res) => {
  const { to, name, from, message } = req.body;
  console.log("Received body:", req.body);


  if (!to || !from || !name || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dreampath91@gmail.com",
      pass: "opmpomhbbvinyzbi",  // <- no spaces
    },
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent!" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Email not sent", details: err.message });
  }
});

/*app.get("/test", async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dreampath91@gmail.com",
      pass: "xexdblbdwhdghkob", // no spaces
    },
  });

  let mailOptions = {
    from: "dreampath91@gmail.com",
    to: "sravanthithummala30@gmail.com",
    subject: "Test Email from DreamPath",
    text: "This is a test email to verify sending works.",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("✅ Email sent!");
  } catch (err) {
    console.error("Test email error:", err);
    res.status(500).send("❌ Failed: " + err.message);
  }
});*/


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
