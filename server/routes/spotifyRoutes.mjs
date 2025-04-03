import express from 'express'
const router = express.Router()
import querystring from 'querystring';
import { generateRandomString } from '../lib/formulas.mjs';
import { exchangeCodeForTokens } from "../services/spotifyServices.mjs";


router.get("/login", function(req, res) {

    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private';
    const REDIRECT_URI = "http://localhost:5431/auth/spotify/callback"
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



    router.get("/callback", async function (req, res) {
      try {
        const code = req.query.code;
    
        if (!code) {
          return res.status(400).json({ error: "Authorization code is missing." });
        }
    
        // Échanger le code contre des jetons
        const tokenData = await exchangeCodeForTokens(code, "http://localhost:5431/auth/spotify/callback");
        const { access_token, refresh_token } = tokenData;
    
        // Stocker les jetons dans la db
        
       
    
        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);
    
        res.status(200).json({ message: "Tokens received.", access_token, refresh_token });
      } catch (e) {
        console.error("Error in /callback route:", e.message);
        res.status(500).json({ error: "An unexpected error occurred.", details: e.message });
      }
    });

    export default router