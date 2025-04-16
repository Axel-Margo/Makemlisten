import { useNavigate } from "@tanstack/react-router";
import { SocialLoginButton } from "../../components/SocialLoginButtons"
import { authClient, signInWithSocial } from "../../lib/auth-client"

export const SpotifyLogin = () => {
  const handleSpotifyLogin = async () => {
        try {
          const data = await signInWithSocial(
            { provider: "spotify" },
            "http://localhost:5431/api/auth/callback/spotify" 
          );
          console.log("Spotify login successful:", data);
          
        } catch (error) {
          console.error("Error during Spotify login:", error);
        }
      }; 
      
    return  <>
                <SocialLoginButton className="bg-green-500" iconSrc="#" onClick={handleSpotifyLogin}  text="Sign in with Spotify"  />
            </>
}