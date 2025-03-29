import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const rootElement = document.getElementById('app')!

const queryClient = new QueryClient()

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <GoogleOAuthProvider clientId='606942761943-gdh710ef9s1fpsusrmr1ipiltlsj1o1h.apps.googleusercontent.com'>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} /> 
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}