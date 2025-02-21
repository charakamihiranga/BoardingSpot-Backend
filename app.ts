import dotenv from "dotenv";
import express, { Request, Response} from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";

dotenv.config();


const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);

export default app;