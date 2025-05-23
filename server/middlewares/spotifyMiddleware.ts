import { type NextFunction, type Request, type Response } from 'express';
import { getUserAccessToken } from '../services/authServices';
import { spotifyServices } from '../services/spotifyServices';

export const spotifyUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await getUserAccessToken(req);
        if (!token) {
            res.status(404).json({ error: "Token not found" });
            return;
        }

        const userId = await spotifyServices.fetchSpotifyUserId(token);
        if (!userId) {
            res.status(404).json({ error: "Spotify user ID not found" });
            return;
        }

        // Ajouter l'ID utilisateur à la requête pour qu'il soit disponible dans les routes
        req.spotifyUserId = userId;
        
        // Ajouter l'ID utilisateur dans les headers de la réponse
        res.setHeader('X-Spotify-User-Id', userId);
        
        next();
    } catch (error) {
        res.status(500).json({ error: "Failed to get Spotify user ID" });
    }
} 