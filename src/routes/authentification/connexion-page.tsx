import { createFileRoute } from '@tanstack/react-router'
import { GoogleLogin } from '@react-oauth/google'
import { SocietyMark } from '../../components/SocietyMark'

export const Route = createFileRoute('/authentification/connexion-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
            <SocietyMark />
            <div className='bg-neutral-700'>
  <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
            </div>
         </div>
}
