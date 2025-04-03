import { createAuthClient } from "better-auth/react"
 
export const authClient = createAuthClient({
    baseURL: "http://localhost:5431" // the base url of your auth server
})

export const signInWithSocial = async ({ provider }: { provider: "github" | "apple" | "discord" | "facebook" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" }, callbackUrl: string) => {
  try {
    const data = await authClient.signIn.social({
      provider: provider,
      callbackURL: callbackUrl
    })
    return data;
  } catch (error) {
    console.error("Error during social sign-in:", error);
    throw error;
  }
};