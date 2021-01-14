import path from "path";
import fs from "fs";

export default {
  axios: {
    baseURL: "/",
    proxyHeaders: true,
    credentials: true
  },
  build: {
    optimizeCSS: true
  },
  head: {
    title: "ripwave",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "ripwave" },
      { hid: "identifier-url", name: "identifier-url", content: "https://ripwave.io" },
      { hid: "title", name: "title", content: "ripwave" },
      { hid: "abstract", name: "abstract", content: "ripwave" },
      { hid: "description", name: "description", content: "ripwave" },
      { hid: "keywords", name: "keywords", content: "ripwave, vohzd, " },
      { hid: "author", name: "author", content: "vohzd" },
      { hid: "language", name: "language", content: "EN" },
      { hid: "robots", name: "robots", content: "All" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  loading: { color: '#b56d82' },
  modules: [
    "@nuxtjs/axios",
    //"@nuxtjs/pwa",
    "@nuxtjs/sitemap"
  ],
  plugins: [
    "~/plugins/fontawesome.js"
  ],
  sitemap: {
    hostname: "https://ripwave.io",
    gzip: true
  },
  serverMiddleware: [
    { path: "/api", handler: "~/api/index.js" }
  ],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./api/config/keys/ssl/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "./api/config/keys/ssl/server.cert"))
    }
  }
}
