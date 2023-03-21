var bd;

function IniciarBaseDatos()
  {
    var solicitud = indexedDB.open("Datos-De-Contactos");

    solicitud.addEventListener("error", MostrarError);
    solicitud.addEventListener("success", Comenzar);
    solicitud.addEventListener("upgradeneeded", CrearAlmacen);
  }

function MostrarError(evento)
  {
      alert("Tenemos un ERROR: " + evento.code + " / " + evento.message);
  }

function Comenzar(evento)
  {
      bd = evento.target.result;
  }

function CrearAlmacen(evento)
  {
      var basededatos = evento.target.result;
      var almacen = basededatos.createObjectStore("Contactos", {keyPath: "id"});
      almacen.createIndex("BuscarNombre", "nombre", {unique: false});
  }
window.addEventListener("load", IniciarBaseDatos);