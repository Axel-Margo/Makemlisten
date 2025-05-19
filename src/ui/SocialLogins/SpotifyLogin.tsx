import { useNavigate } from "@tanstack/react-router";
import { SocialLoginButton } from "../../components/SocialLoginButtons";
import { authClient, signInWithSocial } from "../../lib/auth-client";

export const SpotifyLogin = () => {
  const navigate = useNavigate(); // Utilisation correcte du hook

  const handleSpotifyLogin = async () => {
    try {
      const data = await signInWithSocial(
        { provider: "spotify" },
        "http://localhost:5431/api/auth/callback/spotify",
        ["playlist-read-private", "playlist-read-collaborative", "user-read-private", "user-read-email"]

      );
      console.log("Spotify login successful:", data);
    } catch (error) {
      console.error("Error during Spotify login:", error);
    }
  };

  const sessionCheck = async () => {
    try {
      const session = await authClient.getSession(); // Appel correct de la fonction asynchrone
      if (session.data !== null) {
        console.log("Session active:", session);
        navigate({to: '/share/platform-choice/spotify'})
        ; // Redirection si une session existe
      } else {
        await handleSpotifyLogin(); // Attente de l'exécution de la fonction
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }

  return (
    <>
      <SocialLoginButton
        className="bg-green-500"
        iconSrc="#"
        onClick={sessionCheck}
        text="Sign in with Spotify"
      />
    </>
  );
};