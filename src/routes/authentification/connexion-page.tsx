import { createFileRoute } from '@tanstack/react-router'
import { SocietyMark } from '../../components/SocietyMark'
import { SpotifyLogin } from '../../ui/SpotifyLogin'
import { TwitterLogin } from '../../ui/TwitterLogin'

export const Route = createFileRoute('/authentification/connexion-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full '>
            <SocietyMark />
            <div className='bg-neutral-700 p-4'>
              <h1 className='text-center mt-auto'>Connexion</h1>
          <SpotifyLogin />
          <TwitterLogin />

          
            </div>
         </div>
}
