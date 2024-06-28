const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
        authMethod: 'PLAIN'
    },
    port: 465,
    host: 'smtp.gmail.com'
})

const sendMail = async (email, subject, content) => {
    try {
        var mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error.message);
                return
            }

            console.log('Mail Sent ', info.messageId);
        })
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    sendMail
}