import { createRootRouteWithContext, Outlet, redirect, ScrollRestoration } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const LANDING_PAGE_ORIGIN_KEY = 'landing_page_origem'
const TRAFFIC_LANDING_PATHS = new Set([
  '/divorcio',
  '/inventario',
  '/pensao-e-guarda',
  '/uniao-estavel',
  '/regularizacao-imobiliaria',
  '/regularizacao-fundiaria',
  '/direito-fundiario',
])

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    if (typeof window === 'undefined') return

    const pathname = location.pathname
    const savedOrigin = window.sessionStorage.getItem(LANDING_PAGE_ORIGIN_KEY)
    const hasValidOrigin = savedOrigin !== null && TRAFFIC_LANDING_PATHS.has(savedOrigin)

    if (TRAFFIC_LANDING_PATHS.has(pathname)) {
      if (!hasValidOrigin) {
        window.sessionStorage.setItem(LANDING_PAGE_ORIGIN_KEY, pathname)
      }
      return
    }

    if (pathname === '/' && hasValidOrigin) {
      throw redirect({ href: savedOrigin })
    }
  },
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