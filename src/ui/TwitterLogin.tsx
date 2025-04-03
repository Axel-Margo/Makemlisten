import { SocialLoginButton } from "../components/SocialLoginButtons"
import { authClient, signInWithSocial } from "../lib/auth-client";

export const TwitterLogin = () => {
  const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "twitter"
    })
  console.log(data)}

    return  <>
                <SocialLoginButton className="bg-neutral-800" onClick={signIn} text="Sign In with Twitter" iconSrc="#" />
            </>
 }