import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/previdenciario')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/previdenciario"!</div>
}
