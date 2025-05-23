import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '../../lib/auth-client'

export const Route = createFileRoute('/test/dashboard')({
  component: RouteComponent,
})

const { data: session } = await authClient.getSession()

function RouteComponent() {
  return <div>Hello {session?.session.userId} </div>
}
