import { createFileRoute } from '@tanstack/react-router'
import { PlaylistDisplay } from '../../../ui/PlaylistDisplay.jsx'
import { SearchBar } from '../../../components/SearchBar.jsx'

export const Route = createFileRoute('/share/platform-choice/spotify')({
  component: SpotifyPlaylists,
})

function SpotifyPlaylists() {
  return (
    <div className='flex justify-center flex-col mx-16'>
      <SearchBar onChange={() => {}} value=''  />
      <PlaylistDisplay />
    </div>
  )
}
