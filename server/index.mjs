import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./dist/auth.js";
import spotifyRoutes from './routes/spotifyRoutes.mjs'

dotenv.config();

const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.all("/api/auth/*", toNodeHandler(auth));



// Routes
app.use('/auth/spotify', spotifyRoutes)



app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});