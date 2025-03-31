import express from 'express'
const router = express.Router()
import querystring from 'querystring';
import { generateRandomString } from '../lib/formulas.mjs';

router.get("/login", function(req, res) {

    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private';
    const REDIRECT_URI = "http://localhost:8888/auth/spotify/callback"
    try  
    {  
      res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
      }))}

    catch(e) {
      console.log(e)
    }}
    ) 

    router.get("/callback", function (req, res) {
      try {
        // Récupérer le code d'autorisation dans l'URL
        const code = req.query.code;
        if (!code) {
          return res.status(400).json({ error: "Authorization code is missing." });
        }
    
        console.log("Authorization code:", code);
    
        // Vous pouvez maintenant utiliser ce code pour obtenir un jeton d'accès
        res.status(200).json({ message: "Authorization code received.", code: code });
      } catch (e) {
        console.error("Error in /callback route:", e);
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    })

    export default router