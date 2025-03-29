import { useQuery } from "@tanstack/react-query"
import { getUserPlaylist } from "../queries/spotifyQueries"

export const PlaylistDisplay = () => {
    
    const query = useQuery({
        queryKey: ['getPlaylist'],
        queryFn: getUserPlaylist
    })
    
    
           
    
    return (
        <div className="w-full bg-gray-600 flex mt-2">
          <div className="w-1/3"></div>
          <div className="w-2/3 border-black bg-neutral-50 flex flex-col">
            {data.items.map((playlist: any) => (
              <div key={playlist.id} className="p-2">
                <p>{playlist.name}</p>
                <div className="flex flex-row justify-between p-2">
                  <p className="text-neutral-400">{playlist.tracks.total} titres</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}