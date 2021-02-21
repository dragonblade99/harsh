import nodemailer from "nodemailer";
import express from "express";
const app = express();
app.use(express.static("public"));

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
    to: "Jwalatravels@gmail.com",
    subject: contact_subject,
    body: `Message from ${contact_name}(${contact_email}), 
    ${contact_message}`,
  });
  console.log(query.body);

  res.redirect("/");
});

app.post("/book", async (req, res) => {
  const response = await sendMail({
    to: "Jwalatravels@gmail.com",
    subject: "Enquiry ",
    body: `<pre>${JSON.stringify(req.body, null, 2)}</pre>`,
  });
  console.log(req.body);
  res.redirect("/");
});

const port = process.env.PORT || 5500; //creating a server

app.listen(port, () => console.log(`Listening on port ${port} `));

async function sendMail({ to, cc, bcc, subject, body }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "Jwalatravels@gmail.com",
        pass: "Jwala@123",
      },
    });

    const message = {
      from: `"jwalatravels" <${"Jwalatravels@gmail.com"}>`, // sender address
      to: "Jwalatravels@gmail.com",
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
