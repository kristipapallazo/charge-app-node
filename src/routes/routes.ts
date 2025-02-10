import { Router, Request, Response, NextFunction } from "express";

console.log("process.env", process.env);

const MAPS_API_KEY = process.env.MAPS_API_KEY;
console.log("MAPS_API_KEY", MAPS_API_KEY);

const router = Router();

// Define the route
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  if (MAPS_API_KEY) {
    res.status(200).send(MAPS_API_KEY); // Send the API key if it exists
    return;
  } else {
    res.status(500).send("error occurred"); // Send an error if the API key is missing
  }
});

// Export the router to be used in your main app
export default router;
