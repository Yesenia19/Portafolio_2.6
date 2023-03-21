const staticMonedas = "Portafolio-Yesenia"

const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/css/main.css",
    "/css/noscript.css",
    "/css/noscript.scss",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticMonedas).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => { 
            return res || fetch(fetchEvent.request)
        })
    )
})