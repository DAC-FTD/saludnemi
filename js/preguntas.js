
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
    const puntaje = totalCorrectas * 100;
    enviarPuntaje(puntaje); // Solo al finalizar
    document.getElementById('quiz-container').innerHTML = `
    <div id="loader">
      <p class="cargando text-center">Enviando respuestas...</p>
      <div class="spinner"></div>
    </div>
  `;
    return;
  }
  mostrarPregunta(); // Cambio inmediato sin loader ni delay
}


function enviarPuntaje(puntaje) {
  const correo = localStorage.getItem("correoUsuario");

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
        cargarPuntajes(correo, puntaje);
      } else {
       // alert("Error al guardar puntaje: " + data.mensaje);
      }
    })
    .catch(err => {
      console.error("Error al registrar puntaje:", err);
      //alert("No se pudo guardar el puntaje.");
    });
}

function mostrarFinal(puntaje) {
  document.getElementById('quiz-container').innerHTML = `
    <div id="pantalla-final" class="pantalla-final text-center">
      <div class="caja-mensaje mx-auto">
        <h2><strong>!HAZ FINALIZADO<br>EL TEST!</strong></h2>
        <p class="mt-3">Obtuviste <strong>${puntaje}</strong> puntos.</p>
      </div>
      <div class="botones mt-4 d-flex justify-content-center gap-3">
        <a href="index.html" class="btn btn-light""><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0,0,256,256">
        <g fill="#1c3247" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M32,8c-0.91125,0 -1.82195,0.30919 -2.56445,0.92969l-20.63477,17.24219c-0.765,0.639 -1.0373,1.75333 -0.5293,2.61133c0.647,1.092 2.07877,1.30534 3.00977,0.52734l0.71875,-0.59961v18.28906c0,2.761 2.239,5 5,5h30c2.761,0 5,-2.239 5,-5v-18.28711l0.71875,0.59961c0.374,0.313 0.8273,0.46484 1.2793,0.46484c0.695,0 1.38462,-0.36069 1.76563,-1.05469c0.465,-0.848 0.19122,-1.91906 -0.55078,-2.53906l-3.21289,-2.68555v-8.49805c0,-1.105 -0.895,-2 -2,-2h-2c-1.105,0 -2,0.895 -2,2v3.48438l-11.43555,-9.55469c-0.7425,-0.6205 -1.6532,-0.92969 -2.56445,-0.92969zM32,12.15234c0.11475,0 0.22877,0.03919 0.32227,0.11719l15.67773,13.09961v20.63086c0,1.105 -0.895,2 -2,2h-8v-14c0,-1.105 -0.895,-2 -2,-2h-8c-1.105,0 -2,0.895 -2,2v14h-8c-1.105,0 -2,-0.895 -2,-2v-20.63281l15.67773,-13.09766c0.0935,-0.078 0.20752,-0.11719 0.32227,-0.11719z"></path></g></g>
        </svg></a>
      </div>
    </div>
  `;
}

function cargarPuntajes(correouser, puntajeTest){
  fetch(`https://script.google.com/macros/s/AKfycbwQjzJpunehvKsmBr7fUeeqN7h0eUqv20OHKzeYURHLm3BPn5TzYsXHoA9r25d9bb9a9w/exec?getUserData=true&correo=${correouser}`)
  .then(r => r.json())
  .then(data => {
    if (data.status === "ok") {
      localStorage.setItem("puntajeUsuario", data.puntaje);
      localStorage.setItem("nivel1", data.nivel1);
      localStorage.setItem("nivel2", data.nivel2);
      localStorage.setItem("nivel3", data.nivel3);
      localStorage.setItem("nivel4", data.nivel4);
      localStorage.setItem("nivel5", data.nivel5);
      mostrarFinal(puntajeTest); // Mostrar solo cuando se confirme el guardado
    }
  });
}

window.onload = cargarPreguntas;
//window.onload = mostrarFinal(100);
