"use strict";

const nodemailer =require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');



let transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "krishnabhati64@gmail.com",
        pass: "lkjhgfds"
    }
}));




exports.sendMailViaSmtp =async (params)=> {
    try {
        console.log(params,"GMAILLLLLLLLLLL");
        let mailOptions = {
            from: "krishnabhati64@gmail.com",
            to: params.email,
            subject: "Verify Email",
            // html: params.content,
            // bcc: config2.CONSTANT.EMAIL_TEMPLATE.BCC_MAIL
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
    return {};
}



exports.sendMail=async (params) =>{
        return await this.sendMailViaSmtp(params);

};

exports.sendVerificationEmail= async (params)=> {
    console.log(params,"EMAIL DATAAAAAAAAAAAAAAAAa")
    await this.sendMail({ "email": params, "subject": "Verify Email", "content": "Mr. please verify your email." });
};