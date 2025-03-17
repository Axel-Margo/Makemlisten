import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

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

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <GoogleOAuthProvider clientId='606942761943-gdh710ef9s1fpsusrmr1ipiltlsj1o1h.apps.googleusercontent.com'>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}