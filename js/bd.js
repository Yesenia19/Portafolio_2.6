
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
