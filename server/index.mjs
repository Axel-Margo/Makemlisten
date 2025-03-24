import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./dist/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5432;

app.use(cors());

app.use(express.json());

app.all("/api/auth/*", toNodeHandler(auth));

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});