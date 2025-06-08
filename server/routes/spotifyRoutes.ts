import express from 'express'
import { spotifyUserMiddleware } from '../middlewares/spotifyMiddleware';
import { playlistController } from '../controllers/spotify/playlistController';

const router = express.Router()

router.use(spotifyUserMiddleware);

router.get('/me', (req: express.Request, res: express.Response) => {
    res.json({ userId: (req as any).spotifyUserId });
});

router.get("/playlists", (req: express.Request, res: express.Response) => {
    return playlistController.handleGetUserPlaylists(req, res);
});

router.get("/playlists/:playlistId", (req: express.Request, res: express.Response) => {
    return playlistController.handleGetCurrentPlaylist(req, res);
});

router.get("/playlists/:playlistId/tracks", (req: express.Request, res: express.Response) => {
    return playlistController.handleGetPlaylistTracks(req, res);
});

router.get("/playlists/:playlistId/tracks/next", (req: express.Request, res: express.Response) => {
    return playlistController.handleGetEntirePlaylistTracks(req, res);
});

export default router