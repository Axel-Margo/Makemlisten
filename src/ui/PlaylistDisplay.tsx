import { useQuery } from "@tanstack/react-query"
import { getUserPlaylist } from "../queries/spotifyQueries"

export const PlaylistDisplay = () => {
    
    const query = useQuery({
        queryKey: ['getPlaylist'],
        queryFn: getUserPlaylist
    })

    const shareCurrentPlaylist = () => {

    }
    
    const data = {
      items: [{
        id: "1",
        name: "Chill Vibes",
        tracks: {
          total: 25,
          length: '2:13:45'
        },
      },
      {
        id: "2",
        name: "Workout Hits",
        tracks: {
          total: 40,
          length: '4:43:02'
        },
      }]
    }
           
    
    return (
  <div className="w-full  flex flex-col mt-2">
    {data.items.map((playlist: any) => (
      <div
        key={playlist.id}
        className="flex flex-row mt-4 first:mt-0 border-black/20 border" onClick={shareCurrentPlaylist}
      >
        <div className="w-1/3">
          <img src="#" alt="Playlist Img" className=" bg-black w-full h-full" />
        </div>

        <div className="w-2/3 border-black bg-neutral-50 h-full p-2">
        <div className="flex flex-col justify-around">
          <p>{playlist.name}</p>
          <div className="flex flex-row justify-between mt-6 ">
            <p className="text-neutral-400">{playlist.tracks.total} titres</p>
            <p className="text-neutral-400">{playlist.tracks.length} </p>

          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}