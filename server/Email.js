var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: "findasolution.donotreply@gmail.com",
    pass: "1234321easy",
  },
});

var mailOptions = {
  from: "findasolution.donotreply@gmail.com",
  to: "findasolution.donotreply@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
