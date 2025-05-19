import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SocietyMark } from '../../components/SocietyMark'
import { SpotifyLogin } from '../../ui/SocialLogins/SpotifyLogin'
import { TwitterLogin } from '../../ui/SocialLogins/TwitterLogin'
import { authClient } from '../../lib/auth-client'
import { useEffect } from 'react'

export const Route = createFileRoute('/authentification/connexion-page')({
  component: RouteComponent,
})

function RouteComponent() {

  return <div className='w-full h-full'>
            <div className='text-center'>
              <SocietyMark />
            </div>
            <div className='bg-neutral-700/60 p-4 mx-8 h-full '>
              <h1 className='text-center text-3xl '>
                Connexion
              </h1>
              <div className='mt-6 mb-30 w-full h-full'>
                  <SpotifyLogin />
                  <TwitterLogin />
              </div>
          
            </div>
         </div>
}
