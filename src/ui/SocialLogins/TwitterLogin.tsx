import { useNavigate } from "@tanstack/react-router";
import { SocialLoginButton } from "../../components/SocialLoginButtons"
import { authClient, signInWithSocial } from "../../lib/auth-client";

export const TwitterLogin = () => {
  const navigate = useNavigate();

  const handleTwitterLogin = async () => {
    try {
      const data = await signInWithSocial(
        { provider: "twitter" },
        "http://localhost:5431/api/auth/callback/twitter" 
      );
      console.log("Twitter login successful:", data);
    } catch (error) {
      console.error("Error during Twitter login:", error);
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
        await handleTwitterLogin(); // Attente de l'exécution de la fonction
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }

    return  <>
                <SocialLoginButton className="bg-blue-400" onClick={sessionCheck} text="Sign In with Twitter" iconSrc="#" />
            </>
 }