import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import { sendEmailSetRoutes } from "./sendEmail";

const MAPS_API_KEY = process.env.MAPS_API_KEY;
console.log("MAPS_API_KEY", MAPS_API_KEY);

const router = Router();

router.use("/send-email", sendEmailSetRoutes);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from the server!" });
});

router.get(
  "/api/geocode",
  async (req: Request, res: Response, next: NextFunction) => {
    const address: string | undefined = req.query?.address as
      | string
      | undefined;

    try {
      if (!address || MAPS_API_KEY)
        throw new Error(
          "Error occured: Address or API key is missing => " + address
        );

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${MAPS_API_KEY}`
      );

      res.status(200).json({ data: response.data });

      // const { results, status } = response.data;

      // if (status === 'OK') {
      //   const coordinates = results[0].geometry.location;
      //   res.json({ coordinates }); // Correct: send response
      // } else {
      //   res.status(400).json({ error: status }); // Correct: send response
      // }
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: true, message: "Geocodigng failed" });
    }
  }
);

export default router;
