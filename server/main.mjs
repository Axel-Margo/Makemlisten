import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth'
import cors from 'cors'
import dotenv from 'dotenv'
 
dotenv.config()

const app = express();
const port = 8000;
 

app.use(cors());

app.use(express.json())

 
app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});