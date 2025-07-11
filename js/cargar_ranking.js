
function cargarRanking() {
  fetch('https://script.google.com/macros/s/AKfycbwQjzJpunehvKsmBr7fUeeqN7h0eUqv20OHKzeYURHLm3BPn5TzYsXHoA9r25d9bb9a9w/exec?ranking=true') // ← Asegúrate de pegar tu URL completa aquí
    .then(response => response.json())
    .then(data => {
      const ranking = data.ranking; // Extraer el array del objeto
      const contenedor  = document.getElementById("rankingLista");

      ranking.forEach((usuario, index) => {
        const div = document.createElement("div");
        div.className = "ranking-item";

        const topClass = index === 0 ? "top-1" :
                        index === 1 ? "top-2" :
                        index === 2 ? "top-3" : "";

        div.innerHTML = `
          <div class="ranking-left">
            <div class="ranking-position ${topClass}">${index + 1}</div>
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(usuario.nombre)}" class="ranking-avatar">
            <div class="ranking-name">${usuario.nombre}</div>
          </div>
          <div class="ranking-score">${usuario.puntaje}</div>
        `;

        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Error al cargar el ranking:", error);
    });
}
