function cargaPerfil(){
  const nombre = localStorage.getItem("nombreUsuario") || "Usuario";
  const correo = localStorage.getItem("correoUsuario") || "No disponible";
  const puntaje = localStorage.getItem("puntajeUsuario") || 0;
  const avatarUrl = localStorage.getItem("avatarSeleccionado") || `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${nombre}?`;

  document.getElementById("perfilNombre").textContent = nombre;
  document.getElementById("perfilCorreo").textContent = correo +' | '+ puntaje+' pts acumulados';
  document.getElementById("avatarPerfil").src = avatarUrl;


  const niveles = [
  { num: 1, titulo: "Nivel 1", descripcion: "Fundamentos del cuidado del enfermero", icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAErUlEQVR4nO1aTWxUVRQ+sKCAjaULRCOkwkZNRSNCaEPp1I5tZzrAgqig7aK6M20yEoiJYScLiYkmTerk3TYw2ujCIpr5e2MRExMspI3EDYkiNEaRVk2NQhfSn3s/c2doO2/6hpl5836m+r7kZF5mZnG+75z7c855RC5cuHDhwoULFy6sAyK7NyHi6eIxb5gnWkZ4wvcLV9unuRqYS1nCN80TbT+nfot4TiGytwshqqaVDESfWY9YU5DHW8e4GhAiuQ8Fm+oDV2ieMxqGQp0I01paKcCQpxKx5re52v5nUaQz7fM6CEaLxhlNgNFRvEvrqJyBuKeTq75Jw8QXbPABjQAZQoyDUYDKDRhuuY/H2z4umbi0Tx7VJa8RQqFBMFpP5QDE62t4wnetJNKqL532OSKfQ4Rv0UcPOkv+zJ5arvonNGTOHYS40gcxdnw50VgzxJknID56GCJcBTGwBoKtKpi0zpK4jhBtc4a86tnMVf+vGoJfvwrcGkcKQkBc6IZIBiDOPg3xQbVhonlEGLc9EzDkqVyW9hePADO30uTTCkB81QFxutIS4lkiXLb1qOSx5z7VkB8JArPTS9z5LMSlY5YTzxIhZNtRJ7LTPjPyM39BxL22kl8wMPJbn/pqxqY3fBD4+8cl8rPTEJEGR8jfzYLrli4FRJ89mRl9/PSZNu2LiPzlE1UIHt4Of2s93uioxZ3QarOy4Ig15Ifq1nG1fWpRgG96ADG/tOWNvlmQg5PvVeC1F57C5h1tGjt77CGzsmDSkiszYk1BTfR/u7QU/d9H8zo2q6zCQE8NHtvtXUZeGut+xLy9oJ86TBeAx1vHNAJMXkiTn/8nfc7fw6GrJyvh9e7RJW6FAFyhL0yv53kywDW7//lDEFfeT3/mcajJ23BP8hYIMI8wbTBPgKjnlZz3+AJueNvrmzVkD+/faakAqWXA6IBpAvCYN6xLXt7tC3BmMLgFW3e1pJbBl8c3Yqp3jeUCcEbvmCdAomVEVwBZ2BSelovPNgkQNU0AJP03dAWQVZ0B52wS4AfTBOBq+21dAcL3l68ACv1hogCBOV0BUvV8mQrA6I71AvSv/r8I4Lut28Yy6NzKWwKJ1hv5Wtf/7U0woXMMFtHAdEgA845BHmk8XWzrugwEMO8ihMjeLiOtaycFgEL7zRMgRNWywDDqzHcnqtDz4pN46cDOlD2/b9cyARqbGxZ/l/2C0bc2lBL9OTCqIjPBGZ0z6lAh1WC21XkaSxEgSWYDCnUadWhHQ1PRAjxeZ7yxCkYvmy9AL1VwhW4acejD4BbUZpXE+ciz7hqj0Z+wrDEKRkfN2qSsMij0uiXkJWSzUY6inCaZM/oKXbN8QgRGgTKOvo/sAFdIKbvoM+oju4AwrZXz+TJK/TG5SdsmgARO0Uau0FXHyctx2ABtIieAEG2TDjhKvp+2OkJ+AfLlBDmfdyTtnYq87iWJUa+N5AfL8pU5MPJbuSRS57xdR10pJ4QcURu9NucgflPe8FbWG6O9VCELKDmoNFJK331VNiknvbYfcWZDDirlrE52abhCMc7oe85oiis0kzL5nP4uKv8jmxmm1/MuXLhw4cKFCxcuSIN/Aa6nSFh3c9sCAAAAAElFTkSuQmCC"},
  { num: 2, titulo: "Nivel 2", descripcion: "Cuidado de la mujer, recién nacido, niño y adolescente", icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdElEQVR4nO1abWxTZRQ+E2UD0TmjTuNgfAkqughzjsFG99WtXRWFRIww4yDqDycZCxIlMyYGiUoExYzm3iFUCfxwKKZreytEjAkiYdEYI4kfsBgdMFQMsqnItvc+5m0p6+1t93E/2pLcJznpsts053nOed/znvNeIgsWLFiwYMGCBQvmAd7iXHhtDcxX5WEB+2EWcPzKpLo+JrkGQhZw9LFA7S+hZ17bDnjLGuCmHLqSgY7CifCVNzF/TSeTXLIcfBCjNskBJtAgE2k/BKqHh7LoSgHabZPgq3yNSXV/jol0tH08H7JIl42JdBoircVmmkDpDPht9Uxy9GgmHrFdtygEiBKiCyK5KN2A/fZrmb92j27i3D6YHZe8QgiBdkGkiZQOgL8knwUcx3WRlhzhtE8Q+QQifIVWujW15PcunMMk52kFmQNLIR9rhdzZoibqq4S89x7Iu2+H7MmGvH08ZDFj1KTjLIkTcNP01JCXbHlMcp5UEPx8FXC+CyHIMuRDjZCDLsgfzYX8Xo5moiOI0JX0TEC7bZIq7b9sBi6eD5MPKwD54ArIOyeZQjxGhK+TWiqZr/pDBfnDTUB/3xB31g/5yPOmE48RwZ20UifHpn105C+eg+yvSir5iEEkp/mpL0VtevuXAn/9NES+vw+ytzQl5C9lwQlTlwI6Kl6Pjj5+3qdM+2Ei/3frOOxbdxueXVaA0ooyzCiyI29eLWYVV6O6egHW19+Nb1+93ogsaDaHfPv8CUyqO3tZgC+eA+TBoS3v6PqETu1ek4f7FlaECA9nkwtr8UrDbF7j9WRBjylHZvjKmxTRP3NkKPq/HU3okPRi7ojEY23LMzP0ZUEbrTBcAOav6VQI0HMoTH7wQrjOJ3BGbJyqInhvSSUc9hLYKkoxtbBG9XxmUTXOvXON9iwQ6BPD+3kWdDHF7v/pY5CPbQt/DuNMz5ZMzLctwrQiOxqXFeCbDdmK592bs7DEWawSwf9Crh4BBuGhG4wToMO2MuE5fhQnvH4hA/+6xyV8/t3G61QCiI35ejfDxYYJwHxVnrjk+dle567Nrbf1apUA7zdN1vWbTKRNxgkQsB+OKwBvbAwQgJe/WAE+e+kmvQJ0GCYAgs7uuALwrs4AAdYtn6Mgf2dxFf7ZNk6vAD8YJgCT6nrjCuDRf3A59PKNmBJTCVqeuEv37zKBfjdQANdAXAFC/bx2J7s2TQyVxGjycxeW6yqBURnwn/kCtF2l2cGTW7JC5TGafH5hDQ626Fv7Jgng6I07xtLo3B9vj0d5Valq49u5eooh5I1fAoGa7pFG16M1nt52+wIV+TefnmkYeeM3wUCcMjiGAWZ0R7ik7gEV+Q0rR54Ep7QMMu+inWMdXccaPwk+6ipSkefdn9HkDT8IwVvWoGV0HbEBIQNPPjIvKZGPGAR6yDgB3JTDGwytzrzx1B0q8rw5enzx/XFtxcOF2LhqFi64tVUZJtIARMomI8FEOqDFGd4IRaY/Y7U9zXlaBQiS0YBA9VqcGdQhAJ8laEp/kZYbL8BWymQCndLi0Lur81GwYOSRWPSBqK62BGfeytQS/dOmDUYh0lqzNi2jDAKtMYU8Bx828quoVJNMGH2Bjpt+QwSRXGkcfQclA0wgIe2iL1IrJQvwUBa/n0+j1O/km3TSBODADrqZCfRjysnz67DtlEupANw0nTuQUvJtNC0l5CPgLyfw+/mUpH2qIh/3kCTS1iSS35WWr8xBJKeZSyJU55NV6vRUCH5FrfXYnID4KX7Cu7LeGN1KmbyB4heVWlrpS6/KBvlNb9JLnNHgF5X8ro5PaZhAPibS90yks0ygiyHjf4f/18G/w4cZhvfzFixYsGDBggULFkiB/wGhmjOffWzFWAAAAABJRU5ErkJggg==" },
  { num: 3, titulo: "Nivel 3", descripcion: "Cuidado del adulto y adulto mayor", icono: "data:image/png;base64,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" },
  { num: 4, titulo: "Nivel 4", descripcion: "Cuidado en la comunidad", icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFN0lEQVR4nO1afWxTVRQ/Q2EMJnNGPhJA3IZowibqJGxu0H3Yrl3VP0iMCIuZ8ytEzZioCZHwjxGmQnQ467vjo7poCMOPdG1fGUFjMidh0RiTJcrHooJuaEZwLBG29d5j7itr+7a39Ou+tkveLzlp0zbN+f3Oufeec+4DMGDAgAEDBgwYMKAf0LVuMbpM9dRd7aRecw/1Wi9QuXaEyvZxxbzWEeqt+UP5zmU6hK719eiAXJjJwM7ieeiuaKQeSy+V7Yz5HsGoTbYilcBPCXShBHXohLkwU4Adpmx0V+2hcu3lmEiH21clyAgEjRIYQALbcR9kQToDPaY6KlsH4yY+Ye2LVAKECdGPBOyQbsAu83zqqfksYeLcjt6tSV4lhATtSGAepAPQU7qCeq3nEiItWwNpP03kpxHhB2yFJaklf6xsNZVtAyoyJzYi62tF1vvGVKLuKmTHCpF9uhSZMwfZgTnISEbUpDWWxHl0QH5qyMumZVS2/aki+G0D4nA/KmAMWfeLyHx2ZF/cj+zj3LiJRhChP+mZgB2m7Clp/30T4uhwgHxAAWRfb0F2OFsX4pNE+DGpRyV1P/y5inxPI+LYSIg7HUN26lXdiU8SwZG0o45NTvvwyI9eQeapTir5CUMCNv1TXw7b9Lo2Iv57NkR+bASZqzwl5G9kwXldlwJ2VjaHRx9/+1Kd9nFE/v0XCvDehyqxqLQKP2lcLiILmvQh31GSReXaoaAA372EyPyhLe/0jpidPfjyClz2QE3Q8tea8bpjVqJZMKhLyYzuikZV9C+dCkX/79MxO3qmORsL1ppVAnC7sDcr8Sxogy3CBaAeS69KgMHuAHn/tcA5H4ODY1IG2q0lU8iLEoBKcFx4P099dqra/U8+gazvw8BrjA6+++xKTfICBfCjE24VJ0Cn6elp6/gYK7yf31qAdz5o0VUAZRkQeEyYANRd7dQkz2v7GJz6z3ETVlSVB8lqCSFKAErgHXECeM09mgLwxiYGp3Y9dU+Q6B3FFmx+5i49BegUJgD6bBc1BeBdXZQOde+6DZcXh4juaViFJ3cu1FOAX4UJQOXaq5oCOBdE5czwBzfjug2mIMmK6nK85pilrwAS/CNQAPu4pgBKPx/ZmW2bikLrvtiCP72Zo3yucwZc11+AtshV2/Edi1QE9z1fEPxuBglgvao5xorgxOX9s/G+ssogOZulFMc+Ck2AZs4S8FouRhpda9lrm1eryDVtKsLWrXlBe+XJwikC7G5YpfQIvycohNhN0KtxDEYYYPJNLk+j1o/W1pRVJtQYCT0GqWvD4VhH10Mtc+ImP2GX3stMj0IIXevr4xld85pfq+OLxrY+voav47gFQAkeFSeAA3J5gxGPI34pA6/sn61prteXTCHet/sWpWROcP2PI4EcEAlK4EQiTmnZNztv16cbJOAD0UAJ6kQLcPbt+SryfLmMJjgRUtKfwGbxArRAJpXgL9Ei7H1uJRaWVin1wpGmpSKiP6DbYBQJbBctgGhDCbbpQp6DDxv5VVSqSU4bfQnO6X5DhATsaRx9KyQDVAIp7aJPoBWSBXTCXH4/n0ap38s36aQJwIGHYCGV4EzKyfPrsAOwGFIBdEA+dyCl5NsgLyXkJ8AfTuD38ylJ+1RFXrNIItCSRPLtafnIHBKw6bkklHM+WUddIicEv6IWWTbz/+IV3sx6YrQFMnkDxS8q42mlbzwq6+M3vUk/4kSDX1Tyuzo+paESuCmBXyiBISrBqGL8feCzTv4bPswQ3s8bMGDAgAEDBgwYABX+ByCjM6fdl9ruAAAAAElFTkSuQmCC" },
  { num: 5, titulo: "Nivel 5", descripcion: "Bases epistemológicas", icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFb0lEQVR4nO1aa2wUVRQ+KPKSAMVAi1Z5JAREMdpF6NJud9vSfYJEfqiRSorxhwpJIYCAJIiP+EpMLCllpgSWEPwhD3Ffs5ZoYoSKVE2MIfEBjVGkiMEArQn2ceczd7fQne4s3c7O7C7JfMnJNt1J9n7fOfecc88dIhMmTJgwYcKECRPGAYFFhQjY61io2s8iNa0s4v6DSd4uJvl6YxZxd7GI6/fYdwH7XgRsdWiiArqdgaBlHEKOehZ2tjHJJ8vRpUjbJDeYQH1MpBYIVAs/jaHbBThkH49Q1TtM8v4zLNKJdqwUskg3jYnUAZE24AMaS/kMhO21THJf1Ez8hh2YqhAgQYh2iOSjfANaau5mYddHGRPn9vEcVfIKIQQ6AJHGUT4AYet0FnGfzYi05I6HfQrPpxDhOzRSUW7JHy57iEmeDgWZ4ysgn2mE3LYtmWioCvLhhyEfvA+yfyLkPaMgiyPSJq2yJc6hiWblhrxkL2aS508FwS+fB661IwZZhnxiDeSoD/LRxyDvL9BMdAgR2rMeCThkH58U9l+vB7qvxcnHFYD8xUrI+8YbQnyQCN9ntVSy0JIjCvKt9UBP1wB31gP51EbDiQ8SoSlrpU4eHPaJnu++AjlcnVXyNwwieYwPfSkh6bWsAK7+OkC+pwtyoDwn5Puj4JyhWwHByncTvY/fPlGGfQrPf7X9HnicViy2Vwxp5ZU21D8zH91Nd2iNgvXGkD9UOpZJ3ss3BTi5FpD7BlLe6a0pF+VxWVFc4hqWRbdO1RoFFw1pmRFy1Cu8/9epAe9fOn3LRS202YctwPFXp2jPBc20UncBWNjZphDg4ok4+b7r8To/DAEW2OyxqFCzpa5SvF43F71CBg2SQJ/pfp5nUR9TZP/Pn4Z8Zlf8c4gFDRZg10szjU2GAvXBT5P0EyBoX52yj0+jw8u2AP3J8AndBGChar8qed7bp7GYXAjARHpfPwEiNa2qAvCDjUYBLjeMQnBzEXa/PAPNa6cjsqUQnY0j9RQgqJsAiHrOqwrAT3UaBKisLsPshUuSMv/cRdV474XZ6MkgASYI8LNuAjDJ26kqgH+CJgGGslXLS9CXoQhMoL91FMDXqypA7DyvvwB65Akm0n/GC9CcXrvqqCpXkKtdbsGxTdPw49sTcPK1ydj23IOYbnEqnikpd2S0FXQWwN2pOsZKczGBV4pQtaQMT3oXIry5UPWZnS/OSoqCb9+YlCdbIOI8P9ToOlO7unMk7rcoBfh0U1GeJMGIShkcxgAzHevZPQIzFii3wZGN9+ZHGWSBin3DHV0PJnfpw9G3fKZ1x+SkLfDNjoL8aIQQsNVpGV1zu7LzLtgr40nQ5y7FwXXFSQ0P3+tWR4WC/DxrNf5tvFOzABBomX4CNFEBP2BoWcjRjdNUy5zF5oDXZcXjFeol8s3VczLxfi9Emkh6gol0XMtifnhrQlJyG8qWuUtxXeNEqF+AKOkNCFSrdUF8usPHXemQX/PUI7Fto/W3YuEv0rP6C9BAo5lAF7Quijc1fMqzpXZeLPTnW6vwgMWJR8sq4axZjO2r5mZU9xO832HYYBQibch0gUYbBFpnCHkOPmzkV1G5JpnS+wKdNfyGCCL58tj7bsoGmEBC3nlfpEbKFuCnMfx+Po9Cv40n6awJwIG9NIUJ9EvOyfPrsD1USLkAmmgWX0BOyTfTzJyQvwH+cgK/n89J2OfK86pNkkgNWSR/IC9fmYNIHiO3RKzOZ6vUZVIh+BV1Jm2zCvELvMO7vd4YbaDR/ADFLyq1HKX7X5WN8pverJc4vcEvKvldHZ/SMIFCTKSfmEiXmUDdMeN/x/8X5M/wYYbu53kTJkyYMGHChAkTpMD/HPEdJAPixY0AAAAASUVORK5CYII=" }
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

  const seeds = ["tigre", "leon", "tigrillo", "futbol", "naranja"];
  const seeds2 = ["unemi", "zorrillo", "aaron", "valeria", "fabricio" ];

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
    seeds2.forEach(seed => {
    const img = document.createElement("img");
    img.src = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}`;
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

