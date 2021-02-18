import nodemailer from "nodemailer";
import express from "express";
import formData from "express-form-data";
const app = express();
// app.use(formData.parse({}));

// // app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
); //for data like form in html page
// app.use()
app.post("/enquiry", async (req, res) => {
  let query = req;
  const {
    contact_name,
    contact_email,
    contact_subject,
    contact_message,
  } = query.body;
  const response = await sendMail({
    to: "abc@gmail.com",
    subject: contact_subject,
    body: `HI! ${contact_name} , Email ${contact_email}
    ${contact_message}`,
  });
  console.log(query.body);

  res.json({ ok: "ok", response });
});

app.post("/", async (req, res) => {
  const response = await sendMail({
    to: "abc@gmail.com",
    subject: "Enquiry ",
    body: JSON.stringify(req.body),
  });
  console.log(req.body);
  res.json({ ok: "ok", b: req.body });
});

const port = process.env.PORT || 3000; //creating a server

app.listen(port, () => console.log(`listening on port ${port} `));

async function sendMail({ to, cc, bcc, subject, body }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "abc@gmail.com",
        pass: "xxx",
      },
    });

    const message = {
      from: `"jwalatravels" <${"abc@gmail.com"}>`, // sender address
      to,
      cc,
      bcc,
      subject,
      text: body,
      html: body,
    };

    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    console.error(error);
  }
}

// Example usage

/* 
sendMail({
    to:"vishal@gmail.com",
    subject:"Test",
    body:"Test mail"
})
*/
