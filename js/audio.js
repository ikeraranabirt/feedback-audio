const params =
  new URLSearchParams(
    window.location.search
  );


let id =
  params.get("id");


const nombre =
  params.get("nombre");

const alumno =
  params.get("alumno");

const modulo =
  params.get("modulo");


const saludo =
  document.getElementById("saludo");

const mensajeAudio =
  document.getElementById("mensajeAudio");

const player =
  document.getElementById("player");

const error =
  document.getElementById("error");


/**
 * Compatibilidad con enlaces antiguos
 * que utilicen ?url=https://voca.ro/...
 */
function obtenerIdDesdeUrl() {

  const url =
    params.get("url");


  if (!url) {
    return null;
  }


  const match = url.match(
    /(?:voca\.ro|vocaroo\.com)\/(?:embed\/)?([A-Za-z0-9]+)/i
  );


  if (!match) {
    return null;
  }


  return match[1];
}


/**
 * Personaliza el mensaje mostrado al alumno.
 */
function mostrarMensaje() {

  if (alumno) {

    saludo.textContent =
      `Kaixo ${alumno}:`;
  }


  if (nombre && modulo) {

    mensajeAudio.textContent =
      `${nombre}, zure ${modulo} irakaslea ahots-ohar bat bidali dizu...`;

  } else if (nombre) {

    mensajeAudio.textContent =
      `${nombre}, zure irakaslea ahots-ohar bat bidali dizu...`;
  }
}


/**
 * Carga el reproductor de Vocaroo.
 */
function cargarAudio() {

  if (!id) {

    id =
      obtenerIdDesdeUrl();
  }


  if (
    id &&
    /^[A-Za-z0-9]+$/.test(id)
  ) {

    player.src =
      `https://vocaroo.com/embed/${id}?autoplay=0`;

    return;
  }


  player.style.display =
    "none";

  error.style.display =
    "block";
}


/**
 * Inicialización.
 */
mostrarMensaje();
cargarAudio();