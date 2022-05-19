import * as nodemailer from 'nodemailer';

export const sendEmail= async(autherEmail:string,User_id:string) => {

let transporter = nodemailer.createTransport({
host: "smtp.office365.com",
port: 587,
secure: false,
auth: {
user: process.env.USER_NAME,
pass:process.env.USER_PASSSWORD
},
});
const link =`http://localhost:3000/user/confirm/${User_id}`

let info = await transporter.sendMail({
from: '"Azi!!!!" <suhail.pathan@azilen.com>',
to: autherEmail,
subject: "Email Confirmation",
text: "Booklibrary",
html: `<body><b>You have registered in our app</b>
<p>
Please confirm your email here <a href="${link}">Please confirm email</a></p></body> "`,
});

console.log("Message sent: %s", info.messageId);

console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
return Promise.resolve("sucessfull");

}