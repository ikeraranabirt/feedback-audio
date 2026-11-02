const params =
  new URLSearchParams(
    window.location.search
  );


const audioUrl =
  params.get("audioUrl");


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


function mostrarMensaje() {

  aplicarIdioma(
    lang
  );

  if (!alumno) {
    saludo.style.display = "none";
  }

  if (!nombre) {
    mensajeAudio.style.display = "none";
  }

  if (!alumno && !nombre) {
    document.querySelector(".escuchar").style.display = "none";
  }


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

  let url;

  try {
    url = new URL(audioUrl);
  } catch {
    url = null;
  }

  if (
    url &&
    url.protocol === "https:" &&
    url.hostname === "res.cloudinary.com" &&
    url.pathname.startsWith("/jvgd0byu/video/upload/")
  ) {
    player.src = url.toString();
    return;
  }

  player.style.display =
    "none";

  error.style.display =
    "block";
}


mostrarMensaje();

cargarAudio();