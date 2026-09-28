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


function obtenerIdVocaroo(url) {

  const match = url.match(
    /(?:voca\.ro|vocaroo\.com)\/(?:embed\/)?([A-Za-z0-9]+)/i
  );

  if (!match) {
    return null;
  }

  return match[1];
}


function generarUrlAudio({
  id,
  nombre,
  alumno,
  modulo,
  lang
}) {

  const url = new URL(
    "./audio.html",
    window.location.href
  );

  url.searchParams.set(
    "id",
    id
  );

  url.searchParams.set(
    "nombre",
    nombre
  );

  url.searchParams.set(
    "alumno",
    alumno
  );

  url.searchParams.set(
    "modulo",
    modulo
  );

  url.searchParams.set(
    "lang",
    lang
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


form.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


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


    const vocaroo =
      document
        .getElementById("vocaroo")
        .value
        .trim();


    const id =
      obtenerIdVocaroo(
        vocaroo
      );


    if (!id) {

      alert(
        translations[
          idiomaActual
        ].invalidVocaroo
      );

      return;
    }


    enlaceGenerado =
      generarUrlAudio({

        id,
        nombre,
        alumno,
        modulo,
        lang:
          idiomaActual

      });


    activarAcciones();

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