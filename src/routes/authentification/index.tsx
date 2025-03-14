import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authentification/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/authentification/"!</div>
}
