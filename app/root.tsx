import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { rootAuthLoader } from '@clerk/remix/ssr.server';

import styleSheet from '~/styles/global.css';
import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix';

export const links: LinksFunction = () => [
  ...(styleSheet ? [{ rel: 'stylesheet', href: styleSheet }] : []),
];

export const loader: LoaderFunction = (args) => rootAuthLoader(args);
export const ErrorBoundary = ClerkErrorBoundary();

const App = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

// Wrap your app in ClerkApp(app)
export default ClerkApp(App);
