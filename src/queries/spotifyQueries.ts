export const getCurrentUserPlaylists = async () => {
    const response = await fetch('http://localhost:5431/spotify/playlists', {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error("Failed to get playlists");
    }
    
    const { data } = await response.json();
    return data;
}

export const getPlaylistTracks = async (playlistId: string, offset: number = 0, limit: number = 100) => {
    const response = await fetch(`http://localhost:5431/spotify/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Failed to get playlist tracks");
    }

    const { data, total, offset: currentOffset, limit: currentLimit } = await response.json();
    
    return {
        tracks: data,
        total,
        offset: currentOffset, 
        limit: currentLimit
    };
} 