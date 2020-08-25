const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name, token) => {
  const msg = {
    to: email,
    from: "aguptaking@gmail.com",
    subject: "Account Verification Email",
    html: `<div>
            <div>Hello ${name},</div>  
            <br></br>
            <div>Thanks for joining in!</div>
            <br></br>
            <div> To Verify your account click on the link: ${process.env.CLIENT_URL}/verify/${token}</div> 
           </div>`,
  };
  sgMail.send(msg);
};

module.exports = {
  sendWelcomeEmail,
};
