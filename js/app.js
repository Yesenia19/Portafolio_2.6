const container = document.querySelector(".container")
const coffees = [
    { name: "50 aniversario de la aplicación del Plan Marina", image: "images/C_mon20pesos_PlanMarina.png" },
    { name: "Quincuagésimo aniversario de la aplicación del Plan DN-III-E", image: "images/C_mon_20_pesos_PlanDNIIIE.png" },
    { name: "Centenario de la promulgación de la Constitución Política de los Estados Unidos Mexicanos del 5 de febrero de 1917", image: "images/20_Const1917_rev_pagMon20.png" },
    { name: "Bicentenario luctuoso del generalísimo José María Morelos y Pavón", image: "images/Morelos_20_anvTransp_peq.png" },
    { name: "Centenario de la Fuerza Aérea Mexicana", image: "images/Fuerza_Aerea_20_revTransp_peq.png" },
    { name: "Centenario de la toma de Zacatecas", image: "images/C_20pesosZacatecas_142.png" },
    { name: "Centenario de la gesta heroica de Veracruz", image: "images/C_20pesosVeracruz_144.png" },
    { name: "150 aniversario del natalicio y 100 aniversario luctuoso de Belisario Domínguez", image: "images/C_20pesosBelisario_144.png" },
    { name: "Centenario del Ejército Mexicano", image: "images/C_20pesosEjercito_144.png" },
    { name: "Vigésimo aniversario de la entrega del Premio Nobel de Literatura a Octavio Paz", image: "images/C_20pesosPazNobel_144.png" },
    { name: "Octavio Paz, cambio de milenio", image: "images/C_20pesosPazCambioMilenio_144.png" },
]

const showMonedas = () => {
    let output = ""
    coffees.forEach(
        ({ name, image }) =>
        (output += `
        <div class="card">
                <img class="card--avatar" src=${image} /> 
                <h1 class="card--title">${name}</h1> 
                <a class="card--link">Solicitar</a>
            </div>
            `)
        )
        container.innerHTML = output
    }
    document.addEventListener("DOMContentLoaded", showMonedas)


if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
            navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
        });
    }
