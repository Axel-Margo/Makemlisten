import { useQuery } from "@tanstack/react-query"
import { fetchCurrentUserPlaylists } from "../queries/spotifyQueries"
import { SearchBar } from "../components/SearchBar"
import { FilteredPlaylistList } from "../components/FilteredPlaylistList"
import { useState } from "react"

export const PlaylistDisplay = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getPlaylist'],
        queryFn: fetchCurrentUserPlaylists,
        retry: 1,
        staleTime: 1000 * 60 * 5, 
    })
    
    const playlists = data?.currentUserPlaylists
    
    const [value, setValue] = useState<string>("");

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
            <SearchBar value={value} setValue={setValue} />
            <FilteredPlaylistList playlists={playlists} searchValue={value} />
        </div>
    );
};