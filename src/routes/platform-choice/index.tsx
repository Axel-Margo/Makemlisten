import { createFileRoute } from '@tanstack/react-router'
import { Label } from '../../components/Label'

export const Route = createFileRoute('/platform-choice/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<>
            <div className=' h-full mx-20 '>
              <Label text="Importer une playlist" />
              <div className='bg-neutral-500'>HDSQIDSQ</div>
            </div>
         </>)
}
