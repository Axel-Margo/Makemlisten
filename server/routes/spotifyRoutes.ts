import express from 'express'
import { prisma } from '../lib/auth';
const router = express.Router()

router.get("/token", async (req, res) => {

    const userId = "EFNtwMDElLisjUYkCLZg5Peb3D7kVo6Y"

    const token = await prisma.account.findUnique(
    {
    where: { id: userId }, 
    select: { accessToken: true }
    }
)
     console.log(token)
    });

    export default router