import type { Tracks } from "./tracks";

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

export interface entirePlaylistTracksFetchResponse {
    data: Tracks[];
    total: number;
    hasNext: boolean;
} 

export interface playlistFetchResponse {
    data: Tracks[];
    total: number;
    offset: number;
    limit: number;
} 

export interface userPlaylistsFetchResponse {
    data: Playlist[];
}

export interface SpotifyPlaylistItem {
    tracks: Tracks[];
    href: string;
    id: string;
    images: Array<{ url: string }>;
    name: string;
    owner: {
        display_name: string;
    };
}