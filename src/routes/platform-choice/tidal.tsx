import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/platform-choice/tidal')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/share/platform-choice/tidal"!</div>
}
