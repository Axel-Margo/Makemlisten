import { createFileRoute } from '@tanstack/react-router'
import { GoogleLogin } from '@react-oauth/google'
import { SocietyMark } from '../../components/SocietyMark'
import { SpotifyLogin } from '../../ui/SpotifyLogin'

export const Route = createFileRoute('/authentification/connexion-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full '>
            <SocietyMark />
            <div className='bg-neutral-700 p-4'>
              <h1 className='text-center'>Connexion</h1>
          <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
          />
          <SpotifyLogin />
          
            </div>
         </div>
}
