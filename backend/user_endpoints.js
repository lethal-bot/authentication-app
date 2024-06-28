const express = require('express');
const User = require('./user_model')
const mailer = require('./mailer');
const auth = require('./auth');
const router = new express.Router();

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if (!user.isVerified) return res.status(401).send({ message: "not verified" });
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users', async (req, res) => {
    console.log(req.body);
    const generateOtp = () => Math.floor(1000 + Math.random() * 9000);
    try {
        const user = new User(req.body);
        // const token = await user.generateAuthToken()
        const otp = generateOtp()
        const msg = `<h3>${otp}</h3>`
        console.log(req.body.email);
        await mailer.sendMail(req.body.email, 'Mail Verification', msg)
        user.otp = otp.toString()
        await user.save();
        // res.status(201).send({ user, token })
        res.status(201).send({ user })
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e);

    }
})


router.post('/verify/otp', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (!user) res.status(404).send(e);
        if (user.otp === req.body.otp) {
            user.isVerified = true;
            user.otp = undefined;
            const token = await user.generateAuthToken()
            await user.save();
            res.status(200).send({ token });
        } else res.status(500).send({ "message": "invalid otp" })
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/verify/resendOtp', async (req, res) => {
    const generateOtp = () => Math.floor(1000 + Math.random() * 9000);
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) res.status(404).send(e);
        const otp = generateOtp()
        const msg = `<h3>${otp}</h3>`
        await mailer.sendMail(req.body.email, 'Mail Verification', msg)
        user.otp = otp.toString()
        await user.save();
        res.status(201).send()
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

module.exports = router;