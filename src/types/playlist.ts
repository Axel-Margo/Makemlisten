export interface Playlist {
    id: string;
    name: string;
    image: string;
    owner: string;
    tracks: number;
    external_urls?: {
        spotify: string;
    };
} 