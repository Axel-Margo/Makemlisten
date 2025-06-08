import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/platform-choice/apple-music')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/share/platform-choice/apple-music"!</div>
}
