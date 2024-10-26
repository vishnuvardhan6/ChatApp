import express from "express"; 
import dotenv from "dotenv"; 
import connectDB from "./config/database.js"; 
import cookieParser from "cookie-parser"; 
import userRoute from "./routes/userRoute.js"; 
import messageRoute from "./routes/messageRoute.js";
dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser()); 
app.use(express.json()); 

// Routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message",messageRoute);
// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.listen(PORT, async () => {
    await connectDB(); 
    console.log(`Server listening on port ${PORT}`);
});
