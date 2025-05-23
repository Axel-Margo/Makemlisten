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

