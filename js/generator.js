const form =
  document.getElementById("form");

const verResultado =
  document.getElementById("verResultado");

const copiar =
  document.getElementById("copiar");

const mensaje =
  document.getElementById("mensaje");

const languageButtons =
  document.querySelectorAll(
    ".language-button"
  );


let enlaceGenerado = "";

let idiomaActual = "eu";


function cambiarIdioma(lang) {

  idiomaActual = lang;

  aplicarIdioma(lang);

  languageButtons.forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.lang === lang
    );

  });


  mensaje.style.display =
    "none";

  window.dispatchEvent(
    new Event("languageChanged")
  );
}


languageButtons.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      cambiarIdioma(
        button.dataset.lang
      );

    }
  );

});


function generarUrlAudio({
  audioUrl,
  nombre,
  alumno,
  modulo,
  lang
}) {

  const url = new URL(
    "./audio.html",
    window.location.href
  );

  const datos = { nombre, alumno, modulo };

  Object.entries(datos).forEach(([clave, valor]) => {
    if (valor) {
      url.searchParams.set(clave, valor);
    }
  });

  url.searchParams.set(
    "lang",
    lang
  );

  url.searchParams.set(
    "audioUrl",
    audioUrl
  );

  return url.toString();
}


function activarAcciones() {

  verResultado.disabled =
    false;

  copiar.disabled =
    false;

  mensaje.style.display =
    "none";
}

function actualizarEnlace() {

  const nombre =
    document
      .getElementById("nombre")
      .value
      .trim();

  const alumno =
    document
      .getElementById("alumno")
      .value
      .trim();

  const modulo =
    document
      .getElementById("modulo")
      .value
      .trim();

  if (!window.audioUrl || !form.checkValidity()) {
    desactivarAcciones();
    return false;
  }

  enlaceGenerado =
    generarUrlAudio({
      audioUrl: window.audioUrl,
      nombre,
      alumno,
      modulo,
      lang: idiomaActual
    });

  activarAcciones();
  return true;
}

function desactivarAcciones() {

  enlaceGenerado = "";
  verResultado.disabled = true;
  copiar.disabled = true;
  mensaje.style.display = "none";
}

window.addEventListener(
  "audioUploaded",
  actualizarEnlace
);

window.addEventListener(
  "audioUploadCleared",
  desactivarAcciones
);

form.addEventListener(
  "input",
  function () {
    if (window.audioUrl) {
      actualizarEnlace();
    } else {
      desactivarAcciones();
    }
  }
);

form.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
  }
);


async function copiarAlPortapapeles(texto) {

  try {

    await navigator.clipboard.writeText(
      texto
    );

  } catch {

    const textarea =
      document.createElement(
        "textarea"
      );

    textarea.value =
      texto;

    document.body.appendChild(
      textarea
    );

    textarea.select();

    document.execCommand(
      "copy"
    );

    textarea.remove();
  }

}


document
  .getElementById("reiniciar")
  .addEventListener(
    "click",
    function () {

      form.reset();

      window.dispatchEvent(
        new Event("reiniciar")
      );

      desactivarAcciones();

    }
  );


verResultado.addEventListener(
  "click",
  function () {

    if (!enlaceGenerado) {
      return;
    }

    window.open(
      enlaceGenerado,
      "_blank",
      "noopener,noreferrer"
    );

  }
);


copiar.addEventListener(
  "click",
  async function () {

    if (!enlaceGenerado) {
      return;
    }


    await copiarAlPortapapeles(
      enlaceGenerado
    );


    mensaje.textContent =
      translations[
        idiomaActual
      ].copied;


    mensaje.style.display =
      "block";

  }
);


cambiarIdioma(
  idiomaActual
);