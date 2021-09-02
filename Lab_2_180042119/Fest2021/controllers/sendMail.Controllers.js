const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SENDER_EMAIL_ADDRESS,
    pass: process.env.SENDER_EMAIL_PASS,
  },
});

const sendConfirmationMail = (reciever, topic,name,confirmationMail) => {
  let mailOptions = {
    to: reciever,
    subject: `Confirmation for ${topic} event in FEST2021`,
    html: `Congratulations ${name}!! You have successfully registered in FEST2021  ${topic} Event. Your ID: ${confirmationMail} Best of Luck!!!`,
  };
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    }
  });
  console.log("mail", reciever);
};

module.exports = sendConfirmationMail;
