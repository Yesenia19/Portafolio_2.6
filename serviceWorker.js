const staticMonedas = "Portafolio-Yesenia"

const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/images/20_Const1917_rev_pagMon20.png",
    "/images/C_20pesosBelisario_144.png",
    "/images/C_20pesosEjercito_144.png",
    "/images/C_20pesosPazCambioMilenio_144.png",
    "/images/C_20pesosPazNobel_144.png",
    "/images/C_20pesosVeracruz_144.png",
    "/images/C_20pesosZacatecas_142.png",
    "/images/C_mon20pesos_PlanMarina.png",
    "/images/Fuerza_Aerea_20_revTransp_peq.png",
    "/images/Morelos_20_anvTransp_peq.png",
    "/images/C_mon_20_pesos_PlanDNIIIE.png",
    "/images/moneda.png",
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