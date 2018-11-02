const nodemailer = require('nodemailer');

/* eslint-disable no-param-reassign */
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});


const mail = text => `
  <div className="email" style="
  border: 1px solid black;
  padding: 20px;
  font-family: sans-serif;
  line-height: 2;
  font-size: 20px;
  ">
  <h2>Hello dear friend!</h2>
  <p>${text}</p>

  <p>From the team at Fan Boost</p>
  </div>
  `;

  exports.transport = transport;
  exports.mail = mail;