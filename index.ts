import dotenv from "dotenv";
dotenv.config();
import express from "express";

//better auth
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./src/lib/auth";

import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import router from "./src/routes/Router";

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: ["https://blog-client-ivory-rho.vercel.app", "https://blog-admin-vert.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//better auth authenticate + session handler
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
     headers: fromNodeHeaders(req.headers),
   });
 return res.json(session);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
