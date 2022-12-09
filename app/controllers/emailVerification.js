const nodemailer = require("nodemailer");
const userService = require("../services/userService");

module.exports = {
    //send email verification
    sendEmailVerification : (req, res) => {
        const { email } = req.body;

        //find user by email
        userService.getUserByEmail(email)
        .then((result)=>{
            if(!result) {
                res.status(400).json({
                    status: "error",
                    message: "Email not found",
                    data: {},
                });
                return;
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Internal server error",
                data: {},
            });
        });

        //create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
              user: "binair242@gmail.com",
              pass: "dkqyukncpyycveqy",
            },
        });

        //email display
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            html: `<h1>Click the link below to verify your email</h1>
            <a href="http://localhost:8000/api/v1/verify-email/${email}">Verify Email</a>
            `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                res.status(500).json({
                    status: "error",
                    message: "Email not sent",
                    data: {},
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Email sent",
                    data: {},
                });
            }
        });
    },

    //verify email
    verifyEmail : (req, res) => {
        const { email } = req.params;
        userService.getUserByEmail(email)
        .then((result) => {
            if(!result) {
                res.status(400).json({
                    status: "error",
                    message: "Email not found",
                    data: {},
                });
                return;
            }
            else{
                const userId = result.id;
                userService.updateUser(userId, { verified: true })
                .then((result) => {
                    res.status(200).json({
                        status: "success",
                        message: "Email verified",
                        data: {},
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: "error",
                        message: "Internal server error",
                        data: {},
                    });
                });
            }            
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "find email error",
                data: {},
            });
        });        
    }
}