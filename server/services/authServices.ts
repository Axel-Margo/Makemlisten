import { authClient } from "../../src/lib/auth-client";
import { prisma } from "../lib/auth"
import { type Request } from 'express';
import { fromNodeHeaders } from "better-auth/node";

export const getUserAccessToken = async (req: Request) => {
  const { data: session } = await authClient.getSession({ fetchOptions: { headers: fromNodeHeaders(req.headers) } })
 
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