function cargaPerfil(){
  const nombre = localStorage.getItem("nombreUsuario") || "Usuario";
  const correo = localStorage.getItem("correoUsuario") || "No disponible";
  const puntaje = localStorage.getItem("puntajeUsuario") || 0;
  const avatarUrl = localStorage.getItem("avatarSeleccionado") || `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${nombre}?`;

  document.getElementById("perfilNombre").textContent = nombre;
  document.getElementById("perfilCorreo").textContent = correo +' | '+ puntaje+' pts acumulados';
  document.getElementById("avatarPerfil").src = avatarUrl;

  const niveles = [
  { num: 1, titulo: "Nivel 1", descripcion: "Fundamentos del cuidado del enfermero", icono: "data:image/png;base64,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" },
  { num: 2, titulo: "Nivel 2", descripcion: "Cuidado de la mujer, recién nacido, niño y adolescente", icono: "img/tigrillo_nivel2.png" },
  { num: 3, titulo: "Nivel 3", descripcion: "Cuidado del adulto y adulto mayor", icono: "img/tigrillo_nivel3.png" },
  { num: 4, titulo: "Nivel 4", descripcion: "Cuidado en la comunidad", icono: "img/tigrillo_nivel4.png" },
  { num: 5, titulo: "Nivel 5", descripcion: "Bases epistemológicas", icono: "img/tigrillo_nivel5.png" }
];

const puntajeNecesario = 2000;
const contenedor = document.getElementById("listaNiveles");

niveles.forEach(nivel => {
  const puntos = parseInt(localStorage.getItem(`nivel${nivel.num}`)) || 0;
  const porcentaje = Math.min((puntos / puntajeNecesario) * 100, 100);

  const tarjeta = document.createElement("div");
  tarjeta.classList.add("nivel-logro");

tarjeta.innerHTML = `
  <div class="nivel-icono">
    <img src="${nivel.icono}" alt="${nivel.titulo}">
  </div>
  <div class="nivel-info">
    <div class="nivel-titulo"><strong>${nivel.titulo}</strong> — ${nivel.descripcion}</div>
    <div class="nivel-barra-wrapper">
      <div class="nivel-barra">
        <div class="nivel-progreso" style="width: ${porcentaje}%"></div>
      </div>
      ${puntos >= puntajeNecesario ? '<span class="emoji-logro">🏆</span>' : ''}
    </div>
    <div class="nivel-puntos">${puntos} / ${puntajeNecesario} pts</div>
  </div>
`;

  contenedor.appendChild(tarjeta);
});
}

function mostrarGaleriaAvatares() {
  const galeria = document.getElementById("galeriaAvatares");
  galeria.innerHTML = ""; // limpiar por si se reabre
  galeria.style.display = "flex";

  const seeds = ["tigre", "leon", "tigrillo", "robot", "dragon", "unemi", "puma", "aaron"];

  seeds.forEach(seed => {
    const img = document.createElement("img");
    img.src = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}`;
    img.classList.add("avatar-option");

    img.addEventListener("click", () => {
      document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
      img.classList.add('selected');
      document.getElementById("avatarPerfil").src = img.src;
      localStorage.setItem("avatarSeleccionado", img.src);
      galeria.style.display = "none";
    });

    galeria.appendChild(img);
  });
}

