import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode: client-side rendering only
  ssr: false,
  // GitHub Pages serves a project site from /<repo-name>/; the deploy workflow sets BASE_PATH.
  // Locally it is unset, so dev and plain builds stay at "/".
  basename: process.env.BASE_PATH ?? "/",
} satisfies Config;
