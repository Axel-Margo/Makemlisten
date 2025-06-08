import { PlaylistItem } from "./PlaylistItem"
import type { Playlist } from "../types/playlist"

interface FilteredPlaylistListProps {
    playlists: Playlist[];
    searchValue: string;
}

export const FilteredPlaylistList = ({ playlists, searchValue }: FilteredPlaylistListProps) => {
    return (
        <div className="w-full flex flex-col mt-2">
            {playlists
                .filter((playlist: Playlist) => 
                    playlist.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((playlist: Playlist) => (
                    <PlaylistItem
                        key={playlist.id}
                        id={playlist.id}
                        name={playlist.name}
                        image={playlist.image}
                        owner={playlist.owner}
                        tracks={playlist.tracks}
                    />
                ))}
        </div>
    );
}; 