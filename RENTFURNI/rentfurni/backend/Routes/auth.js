const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const fs = require('fs');
const ProductSchema = require('../models/Product');
const { find, findById } = require('../models/Product');

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rentfurni2325@gmail.com',
        pass: 'liia rseg xkfo okbt'
    }
});

// Route to request OTP
router.post('/forgot-password', async(req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = crypto.randomBytes(3).toString('hex');
        user.otp = otp;
        await user.save();

        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}`
        });

        res.json({ message: 'OTP sent to email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/reset-password', async(req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email, otp });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.otp = null; // Clear OTP after reset
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Static admin credentials
const adminEmail = 'admin@gmail.com';
const adminPassword = 'admin123';

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        if (email === adminEmail && password === adminPassword) {
            return res.json({ token: 'admin-token', role: 'admin' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = crypto.randomBytes(16).toString('hex');
        user.token = token;
        await user.save();

        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/register/user', async (req, res) => {
    const { email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'user'  // Ensure role is set
        });

        console.log('New User:', newUser); // Log new user to debug

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const storeimg = multer.diskStorage({
    destination: function (req, res, cb) {
        const imgDir = 'uploads/';
        if (!fs.existsSync(imgDir)) {
            fs.mkdirSync(imgDir);
        }
        cb(null, imgDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // Fixed typo: Data.now() to Date.now()
    }
});

const upload = multer({ storage: storeimg });

router.post('/products', upload.single('image'), async (req, res) => {
    const { name, price, description, available } = req.body;

    try {
        // Validate required fields
        if (!name || !price || !description || available === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields: name, price, description, available' });
        }

        const newProduct = new ProductSchema({
            name: name,
            price: price,
            description: description,
            available: available,
            imageUrl: req.file ? `/uploads/${ req.file.filename }` : ''
        });

        await newProduct.save();
        res.status(201).json({ message: 'Added Successfully', product: newProduct });
    } 
    catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
});

router.get('/products', async (req, res) => {
    try {
        const products = await ProductSchema.find(); // Use ProductSchema.find() instead of find()
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the image file from the server
        if (product.imageUrl) {
            unlinkSync(`.${ product.imageUrl }`);
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});





module.exports = router;
