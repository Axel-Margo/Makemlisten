import { authClient } from "../lib/auth-client";
import { prisma } from "../../server/lib/auth";

const session = await authClient.getSession();
console.log(session)
if (!session) {
  throw new Error("Access token not found. Please log in again.");
}

const user_userId = session.data?.user.id


const getUser = async () => {
    const user = await fetch('')
}


export const getUserPlaylist = async () => {
       
    const data = await fetch('https://api.spotify.com/v1/users/SLATT/playlists',
        {
            method: "GET",
            headers : {
                Authorization: 'Bearer' + ACCESS_TOKEN 
            }
        }
    ) 
    console.log(data)
    return data.json()
}