import nodemailer from "nodemailer";

const sendEmailHandler = (email: string, subject: string, message: string) => {
  /* 
        1. Create a transporter object using the default SMTP transport
        2. Configure the mail options object 
        3. Send the email using the transporter object
    */

  //   console.log(
  //     "process.env.GMAIL_USER, process.env.GMAIL_PASSWORD",
  //     process.env.GMAIL_USER,
  //     process.env.GMAIL_PASSWORD
  //   );

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASSWORD },
    });

    // console.log("JSON.strinigy(transport)", JSON.stringify(transport));
    const mailOptions = {
      from: process.env.GMAIL_USER, //company sender email (handler email)
      to: process.env.GMAIL_USER, //company receiver email(main email)
      replyTo: email,
      subject,
      text: message,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred: ", error);
      } else {
        console.log("info", info);
        console.log("Email sent: " + info.response);
      }
    });

    return { message: "success" };
  } catch (error) {
    const e = error as Error;
    console.log("Error: ", e.message);
    return { error: true, message: e.message };
  }
};

export default sendEmailHandler;
