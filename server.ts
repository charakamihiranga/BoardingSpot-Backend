import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import connectDB from "./src/config/db";

dotenv.config();
connectDB();


const app = express();
const port =process.env.PORT || 3000;

app.use(express.json());

app.use('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
