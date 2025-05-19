import express from 'express'
import { prisma } from '../lib/auth';
import { spotifyController } from '../services/spotifyServices';
const router = express.Router()

router.get("/token", spotifyController.getUserToken);
router.get("/playlist", spotifyController.getUserPlaylist);

export default router