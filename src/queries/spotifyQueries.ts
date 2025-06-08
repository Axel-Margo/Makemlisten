import type { entirePlaylistTracksFetchResponse, playlistFetchResponse, userPlaylistsFetchResponse } from "../types/playlist";

export const fetchCurrentUserPlaylists = async () => {
    const response = await fetch('http://localhost:5431/spotify/playlists', {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("on est la", response)
        if (!response.ok) {
        throw new Error("Failed to get user playlists");
    }
    
    const json = await response.json();
    const { data } = json as userPlaylistsFetchResponse

    return { currentUserPlaylists : data };
}

export const fetchCurrentPlaylist = async (playlistId: string) => {
    const response = await fetch(`http://localhost:5431/spotify/playlists/${playlistId}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (!response.ok) {
        throw new Error("Failed to get current playlist");
    } 
        try {
            const data  = await response.json();
            
            return {
                currentPlaylist: data
            }
;
    } 
        catch (error) {
            console.error("Erreur lors de la récupération de la playlist :", error);
            throw error;
    } }


export const fetchPlaylistTracks = async (playlistId: string, offset: number = 0, limit: number = 100) => {
    
        const response = await fetch(`http://localhost:5431/spotify/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (!response.ok) {
        throw new Error("Failed to get current playlist tracks");
    }

    const json = await response.json();
    
    const { data, total, offset: currentOffset, limit: currentLimit } = json as playlistFetchResponse;
    
    return { currentPlaylistTracks : {
        tracks: data,
        nb_of_tracks: total,
        offset: currentOffset, 
        limit: currentLimit, }
    
    };
}

export const fetchEntirePlaylistTracks = async (playlistId: string) => {
    
    const response = await fetch(`http://localhost:5431/spotify/playlists/${playlistId}/tracks/next`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error("Failed to get entire playlist tracks");
    }

    const json = await response.json() ;
    
    const { data, total, hasNext } = json as entirePlaylistTracksFetchResponse;
    
    return { data, total, hasNext };
    };



