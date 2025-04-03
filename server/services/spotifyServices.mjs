import fetch from "node-fetch";

export async function exchangeCodeForTokens(code, redirectUri) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' +  process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to exchange code for tokens: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}