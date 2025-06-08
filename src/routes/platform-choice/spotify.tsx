import { createFileRoute } from '@tanstack/react-router'
import { PlaylistDisplay } from '../../ui/PlaylistDisplay.js'

export const Route = createFileRoute('/platform-choice/spotify')({
  component: SpotifyPlaylists,
})

function SpotifyPlaylists() {
  return (
      <PlaylistDisplay />
  )
}
