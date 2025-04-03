import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./dist/auth.js";
import spotifyRoutes from './routes/spotifyRoutes.mjs'
import { Cipher } from "crypto";

dotenv.config();

const app = express();
const port = process.env.PORT
const corsOptions = {
    origin: "http://localhost:3001", // Remplacez par l'origine de votre frontend
    credentials: true, // Autorise l'envoi de cookies ou d'en-têtes d'authentification
  };

app.use(cors(corsOptions));
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());


app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  });
// Routes
app.use('/auth/spotify', spotifyRoutes)



app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});