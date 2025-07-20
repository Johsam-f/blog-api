import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";



const app = express();
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
