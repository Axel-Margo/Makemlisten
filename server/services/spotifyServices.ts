// import fetch from "node-fetch";

// // Définition du type pour la réponse des tokens Spotify
// export interface SpotifyTokenResponse {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
//   refresh_token: string;
//   scope: string;
// }

// // Fonction pour échanger un code d'autorisation contre des tokens
// export async function exchangeCodeForTokens(
//   code: string, 
//   redirectUri: string
// ): Promise<SpotifyTokenResponse> {
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " +
//         Buffer.from(
//           `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//         ).toString("base64"),
//     },
//     body: new URLSearchParams({
//       grant_type: "authorization_code",
//       code: code,
//       redirect_uri: redirectUri,
//       client_id: process.env.SPOTIFY_CLIENT_ID || "",
//       client_secret: process.env.SPOTIFY_CLIENT_SECRET || "",
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(
//       `Failed to exchange code for tokens: ${JSON.stringify(errorData)}`
//     );
//   }

//   return response.json() as Promise<SpotifyTokenResponse>;
// }