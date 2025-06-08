import { type Request, type Response } from 'express';
import { getUserAccessToken } from "../../services/authServices";
import { fetchPlaylistTracksPage } from '../../services/spotifyServices';
import type { SpotifyPlaylistItem } from '../../../src/types/playlist';
import type { Tracks } from '../../../src/types/tracks'


export const playlistController = {
    handleGetUserPlaylists: async (req: Request, res: Response) => {
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
        
        const { items } = await response.json();

        
        const playlists = items.map((item: SpotifyPlaylistItem) => ({
            link: item.href,
            id: item.id,
            image: item.images?.[0]?.url,
            name: item.name,
            tracks: item.tracks,
            owner: item.owner.display_name
        }))

        console.log(playlists)

        res.json({ data: playlists });
    },

    handleGetPlaylistTracks: async (req: Request, res: Response) => {
        const token = await getUserAccessToken(req);
        if (!token) {
            res.status(404).send({ error: "Token not found" });
            return;
        }
    
        try {
            const playlistId = req.params.playlistId;
            if (!playlistId) {
                res.status(400).json({ error: "Playlist ID is required" });
                return;
            }
    
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 100;
    
            const data = await fetchPlaylistTracksPage(token as string, playlistId, offset, limit);
    
            res.json({
                data: data.tracks,
                total: data.total,
                offset,
                limit
            });
    
        } catch (error: any) {
            console.error("Error fetching tracks:", error);
            res.status(500).json({ error: "Failed to fetch playlist tracks", details: error.message });
        }
    },
    
    handleGetCurrentPlaylist: async (req: Request, res: Response) => {
        const token = await getUserAccessToken(req);
        if (!token) {
            res.status(404).send({ error: "Token not found" });
            return;
        }

        const playlistId = req.params.playlistId;
        if (!playlistId) {
            res.status(400).json({ error: "Playlist ID is required" });
            return;
        }

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: { Authorization: 'Bearer ' + token }
        });


        const data = await response.json(); 
        
        console.log("Current playlist data:", data);

        res.json({ data: data });
    },


    handleGetEntirePlaylistTracks: async (req: Request, res: Response) => {
        const token = await getUserAccessToken(req);
        if (!token) {
            res.status(404).send({ error: "Token not found" });
            return;
        }
    
        const playlistId = req.params.playlistId;
        if (!playlistId) {
            res.status(400).json({ error: "Playlist ID is required" });
            return;
        }
    
        const limit = 100;
        let offset = 0;
        let allTracks: Tracks[] = [];
        let total = 0;
    
        try {
            let page;
    
            do {
                page = await fetchPlaylistTracksPage(token as string, playlistId, offset, limit);
                allTracks.push(...page.tracks);
                total = page.total;
                offset += page.tracks.length;
            } while (page.next);
            
            console.log("All tracks:", allTracks);

            res.json({
                data: allTracks,
                total,
                hasNext: false
            });
    
        } catch (error: any) {
            console.error("Error fetching tracks:", error);
            res.status(500).json({ error: "Failed to fetch playlist tracks", details: error.message });
        }
    }
}