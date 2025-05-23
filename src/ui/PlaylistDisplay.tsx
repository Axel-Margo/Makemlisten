import { useQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists } from "../queries/spotifyQueries"
import { PlaylistItem } from "./PlaylistItem"
import type { Playlist } from "../types/playlist"
import { SearchBar } from "../components/SearchBar"

export const PlaylistDisplay = () => {
    const { data: playlists, isLoading, isError, error } = useQuery({
        queryKey: ['getPlaylist'],
        queryFn: getCurrentUserPlaylists,
        retry: 1,
        staleTime: 1000 * 60 * 5, 
    })

    if (isLoading) {
        return <div className="w-full flex justify-center mt-4">Chargement des playlists...</div>
    }

    if (isError) {
        return <div className="w-full flex justify-center mt-4 text-red-500">
            Erreur lors du chargement des playlists: {error.message}
        </div>
    }

    if (!playlists || playlists.length === 0) {
        return <div className="w-full flex justify-center mt-4">Aucune playlist trouvée</div>
    }
   
    return (
        <div className='flex justify-center flex-col mx-16'>

        <SearchBar />

        <div className="w-full flex flex-col mt-2">
            {playlists.filter((playlist: Playlist) => playlist.name.toLowerCase().includes(value.toLowerCase()))
            .map((playlist: Playlist)  => (
                <PlaylistItem
                    key={playlist.id}
                    id={playlist.id}
                    name={playlist.name}
                    image={playlist.image}
                    owner={playlist.owner}
                    tracks={playlist.tracks}
                    link={playlist.external_urls?.spotify}
                />
            ))}
        </div>
        </div>
    );
}