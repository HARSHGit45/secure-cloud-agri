import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dataRoutes from "./routes/dataRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import llmRoute from "./routes/llmRoutes.js";

const app = express();

// ✅ Configure CORS properly for Render + Vercel + localhost
app.use(cors({
  origin: [
    "https://secure-cloud-agri.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.use(cors());




app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://secure-cloud-agri.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});



// ✅ Register all routes
app.use("/api/data", dataRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/llm", llmRoute);

// ✅ Server listener
app.listen(5000, () => console.log("Backend running on port 5000"));
