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



// Obtener el valor actual de la cookie
var visitas = parseInt(getCookie("visitas"));

// Incrementar el número de visitas
visitas++;

// Guardar el nuevo valor de la cookie
setCookie("visitas", visitas, 365);

// Funciones para manejar las cookies
function setCookie(nombre, valor, dias) {
    var fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    var expira = "expires=" + fecha.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
}

function getCookie(nombre) {
    var name = nombre + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// Obtener el valor actual del almacenamiento local
var visitas = parseInt(localStorage.getItem("visitas"));

// Incrementar el número de visitas
visitas++;

// Guardar el nuevo valor en el almacenamiento local
localStorage.setItem("visitas", visitas);
