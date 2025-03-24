import { createFileRoute, Link } from '@tanstack/react-router'
import { SocietyMark } from '../components/SocietyMark'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (<div className="p-2 flex flex-col items-center justify-center min-h-screen">
    <SocietyMark />
    <p className="text-lg mb-8 text-center">Explore ou exporte des playlist pour les partager avec le monde entier.</p>
    <div className="flex space-x-4">
      {/* <Link to='/' className="px-4 py-2 bg-purple-400 text-white rounded">Importer une playlist </Link> */}
      {/* <Link to='/' className="px-4 py-2 bg-neutral-500 text-white rounded text-center">Explorer les playlists </Link> */}
    </div>
  </div>
  )
}
