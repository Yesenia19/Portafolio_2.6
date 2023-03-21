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
            .register("serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
        });
    }


    
var fecha = new Date();
var fechaVisita = fecha.toLocaleDateString();
var horaVisita = fecha.toLocaleTimeString();
var numVisitas = localStorage.getItem("numVisitas");
if (numVisitas === null) {
    numVisitas = 1;
} else {
    numVisitas = parseInt(numVisitas) + 1;
}
localStorage.setItem("numVisitas", numVisitas.toString());
var request = indexedDB.open("miBaseDeDatos", 1);
request.onerror = function(event) {
    console.log("Error al abrir la base de datos");
};
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("miObjectStore", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("fechaIndex", "fechaVisita", { unique: false });
    objectStore.createIndex("horaIndex", "horaVisita", { unique: false });
};
request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(["miObjectStore"], "readwrite");
    var objectStore = transaction.objectStore("miObjectStore");
    var visita = { fechaVisita: fechaVisita, horaVisita: horaVisita, numVisitas: numVisitas };
    var requestAdd = objectStore.add(visita);
    requestAdd.onerror = function(event) {
        console.log("Error al agregar la visita a indexedDB");
    };
    requestAdd.onsuccess = function(event) {
        console.log("Visita agregada a indexedDB");
    };
};
