import { createFileRoute } from '@tanstack/react-router'
import { PlaylistDisplay } from '../../../ui/PlaylistDisplay.jsx'

export const Route = createFileRoute('/share/platform-choice/spotify')({
  component: SpotifyPlaylists,
})

function SpotifyPlaylists() {
  return (
      <PlaylistDisplay />
  )
}
