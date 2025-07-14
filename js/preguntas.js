let preguntas = [];
let indiceActual = 0;
let esperando = false;
let totalCorrectas = 0;

// Obtener el nivel desde la URL
const urlParams = new URLSearchParams(window.location.search);
const nivelSeleccionado = urlParams.get('nivel'); // Ejemplo: "1", "2", etc.

function cargarPreguntas() {
  fetch(`https://script.google.com/macros/s/AKfycbwQjzJpunehvKsmBr7fUeeqN7h0eUqv20OHKzeYURHLm3BPn5TzYsXHoA9r25d9bb9a9w/exec?nivel=${nivelSeleccionado}`)
    .then(res => res.json())
    .then(data => {
      preguntas = data.preguntas;
      document.getElementById('pantalla-carga').style.display = 'none';
      document.getElementById('quiz-container').style.display = 'block';
      mostrarPregunta();
    })
    .catch(error => {
      alert('Error al cargar preguntas');
      console.error(error);
    });
}

function mostrarPregunta() {
  const pregunta = preguntas[indiceActual];
  document.getElementById('preguntaTitulo').innerText = `Pregunta #${indiceActual + 1}`;
  document.getElementById('preguntaTexto').innerText = pregunta.pregunta;
  const contenedor = document.getElementById('opciones');
  contenedor.innerHTML = '';

  pregunta.opciones.forEach((opcion, idx) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.innerText = opcion;
    div.onclick = () => seleccionarOpcion(idx, div);
    contenedor.appendChild(div);
  });

  document.getElementById('respuestaFeedback').innerHTML = '';
  document.getElementById('btnSiguiente').style.display = 'none';
  document.getElementById('btnRetro').style.display = 'none';
  esperando = false;
}

function seleccionarOpcion(indice, elemento) {
  if (esperando) return;
  esperando = true;

  const correcta = preguntas[indiceActual].correcta;
  const opciones = document.querySelectorAll('.opcion');

opciones.forEach((el, idx) => {
  el.classList.remove('correcta', 'incorrecta');

  // Si la respuesta es correcta, marcar solo esa opción como correcta
  if (indice === correcta && idx === indice) {
    el.classList.add('correcta');
  }

  // Si la respuesta es incorrecta, marcar solo la opción seleccionada como incorrecta
  if (indice !== correcta && idx === indice) {
    el.classList.add('incorrecta');
  }

  el.style.pointerEvents = 'none';
});

  const feedback = document.getElementById('respuestaFeedback');
  if (indice === correcta) {
    totalCorrectas++;
    feedback.innerHTML = `
      <div class="alert alert-success d-flex align-items-center gap-2 mb-0 p-2 rounded">
        <i class="bi bi-check-circle-fill"></i>
        <span class="fw-semibold">¡Correcto!</span>
      </div>`;
  } else {
    const textoCorrecto = preguntas[indiceActual].opciones[correcta];
    feedback.innerHTML = `
      <div class="alert alert-danger d-flex align-items-center gap-2 mb-0 p-2 rounded">
        <i class="bi bi-x-circle-fill"></i>
        <span>
          <strong>Incorrecto.</strong><br>
          La respuesta correcta es: "${textoCorrecto}"
        </span>
      </div>`;
  }

  // Mostrar retroalimentación adicional si existe
  const retro = preguntas[indiceActual].retro;
  if (retro && retro.trim() !== "") {
    document.getElementById('btnRetro').style.display = 'inline-block';
    document.getElementById('contenidoRetro').innerText = retro;
  } else {
    document.getElementById('btnRetro').style.display = 'none';
  }
  document.getElementById('btnSiguiente').style.display = 'inline-block';
}

function siguientePregunta() {
  indiceActual++;
  if (indiceActual >= preguntas.length) {
    document.getElementById('quiz-container').innerHTML = `<div class="alert alert-success">¡Test finalizado!
    <p>Obtuviste <strong>${totalCorrectas * 100}</strong> puntos.</p></div>`;
    const puntaje = totalCorrectas * 100;
    enviarPuntaje(puntaje);
    return;
  }

  mostrarPregunta(); // Cambio inmediato sin loader ni delay
}


function enviarPuntaje(puntaje) {
  const correo = localStorage.getItem("correoUsuario");
  const nombre = localStorage.getItem("nombreUsuario");

  const scriptUrl = "https://script.google.com/macros/s/AKfycbwQjzJpunehvKsmBr7fUeeqN7h0eUqv20OHKzeYURHLm3BPn5TzYsXHoA9r25d9bb9a9w/exec";

  const formData = new FormData();
  formData.append("correo", correo);
  formData.append("nivel", nivelSeleccionado);
  formData.append("puntos", puntaje);

  fetch(scriptUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        alert("Puntaje guardado correctamente");
      } else {
        alert("Error al guardar puntaje: " + data.mensaje);
      }
    })
    .catch(err => {
      console.error("Error al registrar puntaje:", err);
      alert("No se pudo guardar el puntaje.");
    });
}

window.onload = cargarPreguntas;