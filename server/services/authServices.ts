import { authClient } from "../../src/lib/auth-client";
import { prisma } from "../lib/auth"


export const getUserAccessToken = async (req) => {
  const { data: session } = await authClient.getSession({ fetchOptions: { headers: req.headers } })
 
  try {
    if (!session || session == undefined ) {
  return { success: false, error_message: "No userId in session"};
}
    
    const userAccessTokenObject = await prisma.account.findFirst({
      where: { userId: session.user.id },
      select: { accessToken: true },
    });
    
    const userToken = userAccessTokenObject?.accessToken
    
    return userToken;
  } 
  
  catch (e) {
    console.log(e);
    return { success: false, message: "Failed to get user Token" };
  }
};