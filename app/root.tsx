import { type LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { type ReactNode } from 'react'
import globalStyle from '../styles/global.css?url'
import resetStyle from '../styles/reset.css?url'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStyle },
    { rel: 'stylesheet', href: resetStyle },
  ]
}

export const meta: MetaFunction = () => {
  return [{ title: 'Remix SPA' }]
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
