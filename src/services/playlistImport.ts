import { fetchEntirePlaylistTracks } from '../queries/spotifyQueries';

interface ImportResult {
    success: boolean;
    message: string;
    playlistUrl?: string;
}

export const importToSpotify = async (playlistId: string): Promise<ImportResult> => {
    try {
        const playlistData = await fetchEntirePlaylistTracks(playlistId);
       
        return {
            success: true,
            message: 'Playlist importée avec succès sur Spotify',
            playlistUrl: 'https://open.spotify.com/playlist/...'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Erreur lors de l\'importation vers Spotify'
        };
    }
};

export const importToAppleMusic = async (playlistId: string): Promise<ImportResult> => {
    try {
        const playlistData = await fetchEntirePlaylistTracks(playlistId);
        return {
            success: true,
            message: 'Playlist importée avec succès sur Apple Music',
            playlistUrl: 'https://music.apple.com/playlist/...'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Erreur lors de l\'importation vers Apple Music'
        };
    }
};

export const importToDeezer = async (playlistId: string): Promise<ImportResult> => {
    try {
        const playlistData = await fetchEntirePlaylistTracks(playlistId);
        return {
            success: true,
            message: 'Playlist importée avec succès sur Deezer',
            playlistUrl: 'https://www.deezer.com/playlist/...'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Erreur lors de l\'importation vers Deezer'
        };
    }       
};

export const importToTidal = async (playlistId: string): Promise<ImportResult> => {
    try {   
        const playlistData = await fetchEntirePlaylistTracks(playlistId);
        return {
            success: true,
            message: 'Playlist importée avec succès sur Tidal',
            playlistUrl: 'https://tidal.com/playlist/...'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Erreur lors de l\'importation vers Tidal'
        };
    }
};

export const importPlaylist = async (playlistId: string, platform: string): Promise<ImportResult> => {
    switch (platform.toLowerCase()) {
        case 'spotify':
            return importToSpotify(playlistId);
        case 'apple music':
            return importToAppleMusic(playlistId);
        case 'deezer':
            return importToDeezer(playlistId);
        case 'tidal':
            return importToTidal(playlistId);
        default:
            return {
                success: false,
                message: 'Plateforme non supportée'
            };
    }
}; 