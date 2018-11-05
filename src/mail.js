const nodemailer = require('nodemailer')
const postmarkTransport = require('nodemailer-postmark-transport')

const transport = nodemailer.createTransport(postmarkTransport({
	auth: {
		apiKey: '2bf8257c-c345-4f43-b553-611a60c7b789'
	}
}))

const mailTemp = text => `
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
  `

exports.transport = transport
exports.mailTemp = mailTemp