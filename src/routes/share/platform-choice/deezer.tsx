import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/share/platform-choice/deezer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/share/platform-choice/deezer"!</div>
}
