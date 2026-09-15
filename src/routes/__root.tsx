import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
})

function RootComponent() {
  const { queryClient } = Route.useRouteContext()
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ScrollRestoration />
    </QueryClientProvider>
  )
}