import { SocialLoginButton } from "../../components/SocialLoginButtons"
import { authClient, signInWithSocial } from "../../lib/auth-client";

export const TwitterLogin = () => {
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

    return  <>
                <SocialLoginButton className="bg-neutral-800" onClick={handleTwitterLogin} text="Sign In with Twitter" iconSrc="#" />
            </>
 }