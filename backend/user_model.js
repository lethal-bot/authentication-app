const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is inValid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('length must be greater than 6')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: undefined
    }
})


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.otp;
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const pass = process.env.JWTPASS;
    const token = jwt.sign({ _id: user._id.toString() }, pass);
    user.tokens = user.tokens.concat({ token })

    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('unable to Login');
    }

    return user;
}

//hahsing the password
userSchema.pre('save', async function (next) {

    try {
        const user = this;

        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    } catch (error) {
        next(error);
    }


})

const User = mongoose.model('User', userSchema);
module.exports = User;