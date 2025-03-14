import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/share/platform-choice/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/share/platform-choice/"!</div>
}
