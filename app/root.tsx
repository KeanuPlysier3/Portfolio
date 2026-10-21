import "./app.css"; // first, so the layer order is declared before S2's CSS loads
import { Provider, ToastContainer } from "@react-spectrum/s2";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
  { rel: "icon", type: "image/png", sizes: "64x64", href: `${import.meta.env.BASE_URL}favicon.png` },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@500&family=Inter:wght@400;700;900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


function useRouterHref(href: string) {
  const resolved = useHref(href);
  return /^[a-z][a-z\d+.-]*:/i.test(href) ? href : resolved;
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Provider router={{ navigate, useHref: useRouterHref }}>
      <Outlet />
      {/* where toasts appear; queue one from anywhere with ToastQueue.positive("...") */}
      <ToastContainer placement="bottom" />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre style={{ width: "100%", overflowX: "auto" }}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
