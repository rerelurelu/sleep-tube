import { rootAuthLoader } from '@clerk/remix/ssr.server'
import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix'
import styleSheet from '~/styles/global.css'

export const links: LinksFunction = () => [
  ...(styleSheet ? [{ rel: 'stylesheet', href: styleSheet }] : []),
]

export const loader: LoaderFunction = (args) => rootAuthLoader(args)
export const ErrorBoundary = ClerkErrorBoundary()

const App = () => {
  return (
    <html lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

// Wrap your app in ClerkApp(app)
export default ClerkApp(App)
