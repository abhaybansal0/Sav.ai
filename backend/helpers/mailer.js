import nodemailer from "nodemailer"
import User from "../models/user.js";
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
import dbConnect from "../dbConfig/dbconfig.js";

dotenv.config();
dbConnect();

const sendMail = async ({ email, mailType, userId }) => {
    
    try {
        const hostEmail = process.env.GOOGLE_EMAIL;
        
        const salt = await bcryptjs.genSalt(10);

        const hashedToken = await bcryptjs.hash(userId.toString(), salt);
        console.log(hashedToken);


        if (mailType === 'VERIFY') {

            await User.findOneAndUpdate({ _id: userId },
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )

        } else if (mailType === 'RESET') {
            await User.findOneAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }


        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com", //"sandbox.smtp.mailtrap.io", //  
            port: 587,
            secure: false,
            auth: {
                user:   process.env.GOOGLE_EMAIL, //"28e0655e7a37db", //process.env.GOOGLE_EMAIL, 
                pass:   process.env.GOOGLE_PASSWORD //"b7a8db9ed5958f" //
            }
        });

        const mailOptions = {
            from: hostEmail, // sender address
            to: email,
            subject: "Email Verification", // Subject line
            text: "Please Verify", // plain text body


            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
              <p>Dear User,</p>
              <p>
                Click the link below to ${mailType === 'VERIFY' ? 'verify your email' : 'Reset your password'}:
              </p>
              <p style="margin: 20px 0;">
                <a 
                  href="${process.env.DOMAIN}/${mailType === 'VERIFY' ? 'emailverify' : 'changepass'}?token=${hashedToken}" 
                  style="display: inline-block; padding: 10px 15px; color: #fff; background-color: #000000; text-decoration: none; border-radius: 5px;">
                  ${mailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password'}
                </a>
              </p>
              <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
              <p style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; word-break: break-word;">
                ${process.env.DOMAIN}/${mailType === 'VERIFY' ? 'emailverify' : 'changepass'}?token=${hashedToken}
              </p>
              <p>Thank you,<br>Sav.ai Team</p>
            </div>
          `, // html body
          
        };

        
        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse;




    } catch (error) {
        console.log( 'Error in sending email!!', error)
    }

}

export default sendMail;