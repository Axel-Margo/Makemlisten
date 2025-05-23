import { type Request, type Response } from 'express';
import { getUserAccessToken } from "../../services/authServices";

interface SpotifyPlaylistItem {
    tracks: any;
    href: string;
    id: string;
    images: Array<{ url: string }>;
    name: string;
    owner: {
        display_name: string;
    };
}

export const playlistController = {
    getUserPlaylist: async (req: Request, res: Response) => {
        const token = await getUserAccessToken(req);
        if (!token) {
            res.status(404).send({ error: "Token not found" });
            return;
        }

        // Get user ID from request
        const userId = req.spotifyUserId;
        if (!userId) {
            res.status(404).json({ error: "Spotify user ID not found" });
            return;
        }

        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: { Authorization: 'Bearer ' + token }
        });
        
        const data = await response.json();
        
        const playlists = data.items.map((item: SpotifyPlaylistItem) => ({
            link: item.href,
            id: item.id,
            image: item.images?.[0]?.url,
            name: item.name,
            tracks: item.tracks.total,
            owner: item.owner.display_name
        }))

        res.json({ data: playlists });
    },

    getUserRawPlaylists: async (req: Request, res: Response) => {
        const token = await getUserAccessToken(req);
        if (!token) {
            res.status(404).send({ error: "Token not found" });
            return;
        }

        const userId = req.spotifyUserId;
        if (!userId) {
            res.status(404).json({ error: "Spotify user ID not found" });
            return;
        }

        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: { Authorization: 'Bearer ' + token }
        });
        
        const data = await response.json();

        res.json({ data: data });
    },

    getPlaylistTracks: async (req: Request, res: Response) => {
        const token = await getUserAccessToken(req);
        if (!token) {
            res.status(404).send({ error: "Token not found" });
            return;
        }

        const playlistId = req.params.playlistId;
        const offset = parseInt(req.query.offset as string) || 0;
        const limit = parseInt(req.query.limit as string) || 100;

        if (!playlistId) {
            res.status(400).json({ error: "Playlist ID is required" });
            return;
        }

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`, {
            headers: { Authorization: 'Bearer ' + token }
        });

        if (!response.ok) {
            res.status(response.status).json({ error: "Failed to fetch playlist tracks" });
            return;
        }

        const data = await response.json();
        const tracks = data.items.map((item: any) => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists.map((artist: any) => artist.name).join(', '),
            album: item.track.album.name,
            album_image: item.track.album.images?.[0]?.url,
            duration_ms: item.track.duration_ms,
            isrc: item.track.external_ids?.isrc || null
        }));

        res.json({ 
            data: tracks,
            total: data.total,
            offset: offset,
            limit: limit
        });
    }
}
