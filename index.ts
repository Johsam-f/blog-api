import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/lib/auth";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  //methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/auth", toNodeHandler(auth));
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  });

  if (!response.ok) {
    return res.status(400).json({ error: await response.json() });
  }

  res.json(await response.json());
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
