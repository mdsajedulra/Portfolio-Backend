import express, { Application, Request, Response } from "express";

import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app: Application = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://book-shop-client-ashy.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Sajedul personal portfolio" });
});

// unknown route error handle

app.use(globalErrorHandler);
app.use(notFound);

export default app;