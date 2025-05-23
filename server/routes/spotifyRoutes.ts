import express from 'express'
import { spotifyUserMiddleware } from '../middlewares/spotifyMiddleware';
import { playlistController } from '../controllers/spotify/playlistController';

const router = express.Router()

router.use(spotifyUserMiddleware);

router.get('/me', (req: express.Request, res: express.Response) => {
    res.json({ userId: (req as any).spotifyUserId });
});

router.get("/playlists", (req: express.Request, res: express.Response) => {
    return playlistController.getUserPlaylist(req, res);
});

router.get("/playlists/raw", (req: express.Request, res: express.Response) => {
    return playlistController.getUserRawPlaylists(req, res);
});

router.get("/playlists/:playlistId/tracks", (req: express.Request, res: express.Response) => {
    return playlistController.getPlaylistTracks(req, res);
});

export default router