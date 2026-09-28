const form = document.getElementById("form");

const verResultado = document.getElementById("verResultado");
const copiar = document.getElementById("copiar");
const mensaje = document.getElementById("mensaje");

let enlaceGenerado = "";

/**
 * Extrae el identificador de una URL de Vocaroo.
 *
 * Admite, por ejemplo:
 *
 * https://voca.ro/XXXXXXXX
 * https://vocaroo.com/XXXXXXXX
 * https://vocaroo.com/embed/XXXXXXXX
 */
function obtenerIdVocaroo(url) {

  const match = url.match(
    /(?:voca\.ro|vocaroo\.com)\/(?:embed\/)?([A-Za-z0-9]+)/i
  );

  if (!match) {
    return null;
  }

  return match[1];
}


/**
 * Construye la URL de audio.html.
 *
 * Se utiliza una URL relativa para que funcione
 * tanto en local como en GitHub Pages.
 */
function generarUrlAudio({
  id,
  nombre,
  alumno,
  modulo
}) {

  const url = new URL(
    "./audio.html",
    window.location.href
  );

  url.searchParams.set("id", id);
  url.searchParams.set("nombre", nombre);
  url.searchParams.set("alumno", alumno);
  url.searchParams.set("modulo", modulo);

  return url.toString();
}


/**
 * Activa las acciones disponibles una vez
 * generado correctamente el enlace.
 */
function activarAcciones() {

  verResultado.disabled = false;
  copiar.disabled = false;

  mensaje.style.display = "none";
}


/**
 * Copia un texto al portapapeles.
 */
async function copiarAlPortapapeles(texto) {

  try {

    await navigator.clipboard.writeText(texto);

  } catch {

    const textarea = document.createElement("textarea");

    textarea.value = texto;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();
  }
}


/**
 * Procesa el formulario.
 */
form.addEventListener("submit", function (event) {

  event.preventDefault();

  const nombre =
    document.getElementById("nombre").value.trim();

  const alumno =
    document.getElementById("alumno").value.trim();

  const modulo =
    document.getElementById("modulo").value.trim();

  const vocaroo =
    document.getElementById("vocaroo").value.trim();


  const id = obtenerIdVocaroo(vocaroo);


  if (!id) {

    alert(
      "Introduce un enlace válido de Vocaroo."
    );

    return;
  }


  enlaceGenerado = generarUrlAudio({
    id,
    nombre,
    alumno,
    modulo
  });


  activarAcciones();
});


/**
 * Vista previa de la página que verá el alumno.
 */
verResultado.addEventListener("click", function () {

  if (!enlaceGenerado) {
    return;
  }

  window.open(
    enlaceGenerado,
    "_blank",
    "noopener,noreferrer"
  );
});


/**
 * Copia el enlace destinado al alumno.
 */
copiar.addEventListener("click", async function () {

  if (!enlaceGenerado) {
    return;
  }

  await copiarAlPortapapeles(
    enlaceGenerado
  );


  mensaje.textContent =
    "Enlace copiado al portapapeles.";

  mensaje.style.display = "block";
});