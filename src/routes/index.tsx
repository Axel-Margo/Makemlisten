import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2 flex justify-center">
      <h3 className=''>Welcome Home!</h3>
    </div>
  )
}
