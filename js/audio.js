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

const lang =
  translations[
    params.get("lang")
  ]
    ? params.get("lang")
    : "eu";


const saludo =
  document.getElementById(
    "saludo"
  );

const mensajeAudio =
  document.getElementById(
    "mensajeAudio"
  );

const player =
  document.getElementById(
    "player"
  );

const error =
  document.getElementById(
    "error"
  );


function obtenerIdDesdeUrl() {

  const url =
    params.get("url");

  if (!url) {
    return null;
  }


  const match =
    url.match(
      /(?:voca\.ro|vocaroo\.com)\/(?:embed\/)?([A-Za-z0-9]+)/i
    );


  if (!match) {
    return null;
  }


  return match[1];
}


function mostrarMensaje() {

  aplicarIdioma(
    lang
  );


  if (alumno) {

    saludo.textContent =
      translations[
        lang
      ].greeting(
        alumno
      );

  }


  if (
    nombre &&
    modulo
  ) {

    mensajeAudio.textContent =
      translations[
        lang
      ].teacherMessage(
        nombre,
        modulo
      );

  } else if (nombre) {

    mensajeAudio.textContent =
      translations[
        lang
      ].teacherMessageNoModule(
        nombre
      );

  }

}


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


mostrarMensaje();

cargarAudio();