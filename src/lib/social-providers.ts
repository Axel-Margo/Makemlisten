import { authClient } from "./auth-client";

export const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google login successful:', credentialResponse);

      await authClient.signIn.social({
        provider: 'google',
        callbackURL: 'http://localhost:3001/share/platform-choice/spotify',
        errorCallbackURL: '/',
        newUserCallbackURL: '/',
        disableRedirect: true,
      });
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }