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
                data: err,
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
            html: `   <center> 
            <h1>Email Verification</h1>
            <p>Click this link to verify your email</p>
            <button 
                style=
                "
                border: none;
                transition-duration: 0.4s;
                cursor: pointer;
                background-color: #76b5c3;
                border-radius: 12px;
                "
                type="button"
            > 
                <a 
                style=
                "
                text-decoration: none;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;color: white;
                padding: 16px 32px;
                transition-duration: 0.4s;" 
                href='https://binair-backend-production.up.railway.app/api/v1/verify-email/${email}'>Verify Email</a>
            </button>
            <center>
                    `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                res.status(500).json({
                    status: "error",
                    message: "Email not sent",
                    data: {},
                });
                return;
            } else {
                return res.status(200).json({
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
                    res.render("emailVerified.ejs");
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
                data: err,
            });
        });        
    }
}