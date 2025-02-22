import dotenv from "dotenv";
import express, { Request, Response} from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import {authenticationToken} from "./src/config/jwtConfig";
import roomRoutes from "./src/routes/roomRoutes";

dotenv.config();


const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

// app.use(cors({
//     origin: 'http://localhost:5175',
//     methods: ['GET', 'POST'],
//     credentials: true,
// }));

// routes
app.use('/api/v1/auth', authRoutes);

app.use(authenticationToken);

app.use('/api/v1/rooms', roomRoutes);

export default app;