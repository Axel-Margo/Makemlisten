import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth'
import spotifyRoutes from './routes/spotifyRoutes'

dotenv.config();

const app = express();
const port = process.env.PORT
const corsOptions = {
    origin: "http://localhost:3001", 
    credentials: true, 
  };

app.use(cors(corsOptions));
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());



// Routes
app.use('/auth/spotify', spotifyRoutes)



app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});