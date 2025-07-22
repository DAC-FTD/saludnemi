function cargarRanking() {
  const contenedor = document.getElementById("rankingLista");
  contenedor.innerHTML = `<div class="text-center fw-bold text-white">Cargando ranking...</div>`; // mensaje inicial

  fetch('https://script.google.com/macros/s/AKfycbwQjzJpunehvKsmBr7fUeeqN7h0eUqv20OHKzeYURHLm3BPn5TzYsXHoA9r25d9bb9a9w/exec?ranking=true')
    .then(response => response.json())
    .then(data => {
      const ranking = data.ranking;
      const usuarioActual = localStorage.getItem("nombreUsuario");
      const avatarUrl = localStorage.getItem("avatarSeleccionado") || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(usuario.nombre)}`;
      contenedor.innerHTML = ""; // Limpiar mensaje de carga

      // Mostrar info del usuario actual en su propio cuadro
      const posicionUsuario = ranking.findIndex(r => r.nombre === usuarioActual);
      const datosUsuario = ranking[posicionUsuario];

      const usuarioCard = document.createElement("div");
      usuarioCard.className = "ranking-usuario shadow-sm text-dark mb-3 p-2 rounded";

      usuarioCard.innerHTML = `
        <div class="row d-flex justify-content-between">
          <div class="col-9 col-lg-9 ranking-text-user">
            <div class="ranking-name-user"><strong>Tú:</strong> ${datosUsuario?.nombre || "No identificado"}</div>
            <div class="row">
              <div class="col-lg-auto col-auto ranking-position-user"><strong>Posición:</strong> #${posicionUsuario + 1}</div> 
              <div class="col-lg-auto col-auto ranking-score-user"><strong>Puntos:</strong> ${datosUsuario?.puntaje || 0}</div>
            </div>
          </div>
          <div class="col-3 col-lg-3 ranking-left-user">
           <img src="${avatarUrl}" class="ranking-avatar-user">
          </div>
        </div>
      `;

      contenedor.appendChild(usuarioCard);

      // Mostrar top 10 inicialmente
      const top10 = ranking.slice(0, 10);
      top10.forEach((usuario, index) => {
        const div = document.createElement("div");
        div.className = "ranking-item";
        const topClass = index === 0 ? "top-1" :
                        index === 1 ? "top-2" :
                        index === 2 ? "top-3" : "";

        const esUsuarioActual = usuario.nombre === usuarioActual;
        const avatar = esUsuarioActual
          ? localStorage.getItem("avatarSeleccionado") || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(usuario.nombre)}`
          : `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(usuario.nombre)}`;

        div.innerHTML = `
          <div class="ranking-left">
            <div class="ranking-position ${topClass}">${index + 1}</div>
            <img src="${avatar}" class="ranking-avatar">
            <div class="ranking-name">${usuario.nombre}</div>
          </div>
          <div class="ranking-score">${usuario.puntaje}</div>
        `;

        contenedor.appendChild(div);
      });

      // ✅ Botón para mostrar el resto
      if (ranking.length > 10) {
        const botonVerMas = document.createElement("button");
        botonVerMas.className = "btn btn-outline-light mt-3 d-block mx-auto";
        botonVerMas.textContent = "Ver más";

        botonVerMas.addEventListener("click", () => {
          ranking.slice(10).forEach((usuario, index) => {
            const div = document.createElement("div");
            div.className = "ranking-item";

            div.innerHTML = `
              <div class="ranking-left">
                <div class="ranking-position">${index + 11}</div>
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(usuario.nombre)}" class="ranking-avatar">
                <div class="ranking-name">${usuario.nombre}</div>
              </div>
              <div class="ranking-score">${usuario.puntaje}</div>
            `;
            contenedor.appendChild(div);
          });

          botonVerMas.remove(); // Oculta el botón después de expandir
        });

        contenedor.appendChild(botonVerMas);
      }
    })
    .catch(error => {
      contenedor.innerHTML = `<div class="text-danger text-center">Error al cargar el ranking</div>`;
      console.error("Error al cargar el ranking:", error);
    });
}
