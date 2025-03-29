const ACCESS_TOKEN = "to define"



export const getUserPlaylist = async () => {
       
    const data = await fetch('https://api.spotify.com/v1/users/SLATT/playlists',
        {
            method: "GET",
            headers : {
                Authorization: 'Bearer' + ACCESS_TOKEN 
            }
        }
    )