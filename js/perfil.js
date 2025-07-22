function cargaPerfil(){
  const nombre = localStorage.getItem("nombreUsuario") || "Usuario";
  const correo = localStorage.getItem("correoUsuario") || "No disponible";
  const puntaje = localStorage.getItem("puntajeUsuario") || 0;
  const avatarUrl = localStorage.getItem("avatarSeleccionado") || `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${nombre}?`;

  document.getElementById("perfilNombre").textContent = nombre;
  document.getElementById("perfilCorreo").textContent = correo +' | '+ puntaje+' pts acumulados';
  document.getElementById("avatarPerfil").src = avatarUrl;

  const niveles = [
  { num: 1, titulo: "Nivel 1", descripcion: "Fundamentos del cuidado del enfermero", icono: "img/tigrillo_nivel1.png" },
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

  const seeds = ["tigre", "leon", "tigrillo", "robot", "dragon", "unemi", "puma", "panda"];

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

