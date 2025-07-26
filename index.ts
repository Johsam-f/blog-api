import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/lib/auth";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import router from "./src/routes/Router";

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
