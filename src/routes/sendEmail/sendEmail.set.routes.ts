import { Router, Request, Response } from "express";
import sendEmailHandler from "./sendEmailHandler";
import { body, validationResult, matchedData } from "express-validator";

const sendEmailRoutes = Router();

sendEmailRoutes.post(
  "/",
  [
    body("email").isEmail().withMessage("Invalid email"),
    // body("email").isEmail().notEmpty().escape(),
    body("subject").notEmpty().escape(),
    body("message").notEmpty().escape(),
  ],
  (req: Request, res: Response) => {
    try {
      console.log("req.body", req.body);
      const results = validationResult(req);

      console.log("results", results);
      if (!results.isEmpty()) {
        res.status(422).json({ errors: results.array() });
        return;
      }

      const data = matchedData(req);

      const { email, subject, message } = data;

      const userData = {
        email: "kristi.papallazo@gmail.com",
        subject: "lts",
        message: "opppps",
      };
      // const { email, subject, message } = userData;

      const processedSubject = `Email from ${email} - ${subject}`;

      const response = sendEmailHandler(email, processedSubject, message);
      if (response.error) throw new Error(response.message);

      res.status(200).json({ message: response.message });
    } catch (error) {
      const e = error as Error;
      console.log("Error: ", e.message);
      res.status(500).json({ error: true, message: e.message });
    }
  }
);

export default sendEmailRoutes;
