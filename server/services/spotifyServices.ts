import type { Request, Response } from 'express';
import { getUserAccessToken } from "./authServices"

type NoSession = { success: boolean; error_message: string };
type ErrorToken= { success: boolean; message: string}



export const spotifyServices = {
    fetchSpotifyUserId: async (token: string | ErrorToken | NoSession) => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: 'Bearer ' + token }
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.id; 
    }
}

export const  fetchPlaylistTracksPage = async (token: string, playlistId: string, offset: number, limit: number) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`, {
        headers: { Authorization: 'Bearer ' + token }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch playlist tracks at offset ${offset}`);
    }

    const data = await response.json();

    const tracks = data.items
    .filter((item: any) => {
        if (item.track === null) {
            console.warn("Track ignored (track null):", item);
            return false;
        }
        return true;
    })
    .map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(', '),
        album: item.track.album.name,
        album_image: item.track.album.images?.[0]?.url,
        duration_ms: item.track.duration_ms,
        isrc: item.track.external_ids?.isrc || null
    }));


    return {
        tracks,
        total: data.total,
        next: data.next,
        offset,
        limit
    };
}
