// typically focus only on starting the server and connecting to the database
import app from "./app";
import connectDB from "./src/config/db";

const port =process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Boardingspot-backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
