import dotenv from "dotenv";
import express, { Request, Response} from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import roomRoutes from "./src/routes/roomRoutes";
import cookieParser from "cookie-parser";
import foodSupplierRoutes from "./src/routes/foodSupplierRoutes";

dotenv.config();


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
}));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/food-suppliers', foodSupplierRoutes);

export default app;