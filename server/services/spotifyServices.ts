import { getUserAccessToken } from "./authServices"

type NoSession = { success: boolean; error_message: string };
type ErrorToken= { success: boolean; message: string}


async function fetchSpotifyUserId(token: string | ErrorToken | NoSession) {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: 'Bearer ' + token }
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.id; 
}

export const spotifyController = {
    getUserToken: async (req, res) => {
        const token = await getUserAccessToken(req)
        if (token) {
            res.json(token);
        } else {
            res.status(404).json({ error: "Token not found" });
        }
    },

    getUserPlaylist: async (req, res) => {
    const token = await getUserAccessToken(req);
    if (!token) {
        return res.status(404).json({ error: "Token not found" });
    }

    // Récupérer l'ID Spotify de l'utilisateur
    const userId = await fetchSpotifyUserId(token);
    if (!userId) {
        return res.status(404).json({ error: "Spotify user ID not found" });
    }

    // Utiliser l'ID dans la requête pour les playlists
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: { Authorization: 'Bearer ' + token }
    });
    
    const data = await response.json();
    
    const playlists = data.items.map((item, i) => ({
        link: item.href,
        id: item.id,
        image: item.images?.[0]?.url,
        name: item.name
    }))

    res.json({ data: playlists });
    }
}