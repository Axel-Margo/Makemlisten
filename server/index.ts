import express from "express";
import type { RequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth'
import spotifyRoutes from './routes/spotifyRoutes'

dotenv.config();

const app = express();
const port = process.env.PORT

app.use(
  cors({
    origin: "http://localhost:3001", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
)

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json()); 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true'); 
    next();
});

// Routes Spotify
app.use('/spotify', spotifyRoutes);

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});