let preguntas = [];
let actual = 0;
let numpreg = 1;
let claveAcceso = "";

function verificarClave() {
  const entrada = document.getElementById("claveInput").value.trim();
  if (!entrada) {
    document.getElementById("error").textContent = "⚠️ Por favor, ingresa una clave.";
    return;
  }

  fetch(`https://script.google.com/macros/s/AKfycbwQjzJpunehvKsmBr7fUeeqN7h0eUqv20OHKzeYURHLm3BPn5TzYsXHoA9r25d9bb9a9w/exec?n=5&clave=${entrada}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("error").textContent = "❌ Clave incorrecta. Intenta de nuevo.";
      } else {
        preguntas = data;
        claveAcceso = entrada;
        document.getElementById("login").style.display = "none";
        document.getElementById("preguntas").style.display = "block";
        mostrarPregunta();
      }
    })
    .catch(() => {
      document.getElementById("error").textContent = "Error de conexión con el servidor.";
    });
}

function mostrarPregunta() {
  const q = preguntas[actual];
  document.getElementById("numpregunta").textContent = "Pregunta # " + numpreg;
  document.getElementById("pregunta").textContent = q.Pregunta;

  const contenedor = document.getElementById("opciones");
  contenedor.innerHTML = "";
  document.getElementById("retro").style.display = "none";
  document.getElementById("retro").textContent = "";
  document.getElementById("siguiente").style.display = "none";

  const opciones = [q.OpcionA, q.OpcionB, q.OpcionC, q.OpcionD];

  opciones.forEach((textoOpcion) => {
    const btn = document.createElement("button");
    btn.textContent = textoOpcion;
    btn.className = "btn-opcion";
    btn.onclick = () => {
      deshabilitarOpciones(q.Correcta, textoOpcion);
    };
    contenedor.appendChild(btn);
  });
}

function deshabilitarOpciones(correctaTexto, seleccionadaTexto) {
  const botones = document.querySelectorAll(".btn-opcion");

  botones.forEach((btn) => {
    btn.disabled = true;
    const texto = btn.textContent.trim();
    const esCorrecta = texto.toLowerCase() === correctaTexto.toLowerCase();
    const esSeleccionada = texto.toLowerCase() === seleccionadaTexto.toLowerCase();

    if (esCorrecta) btn.classList.add("correcta");
    if (esSeleccionada && !esCorrecta) btn.classList.add("incorrecta");
  });

  const retro = document.getElementById("retro");
  retro.style.display = "block";

  if (seleccionadaTexto.trim().toLowerCase() === correctaTexto.trim().toLowerCase()) {
    retro.textContent = "🎉 ¡Respuesta correcta! Bien hecho.";
  } else {
    retro.textContent = `❌ Respuesta incorrecta. La correcta es: "${correctaTexto}".`;
  }

  document.getElementById("siguiente").style.display = "inline-block";
}

function siguientePregunta() {
  actual = (actual + 1) % preguntas.length;
  numpreg++;
  mostrarPregunta();
}
