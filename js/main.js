// ===== Menú lateral en celular =====
const btnMenu = document.getElementById("btn-menu");
const menu = document.querySelector("nav.lateral");

if (btnMenu && menu) {
  btnMenu.addEventListener("click", () => {
    menu.classList.toggle("abierto");
  });

  // Cerrar el menú al dar clic en un enlace
  menu.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => menu.classList.remove("abierto"));
  });
}

// ===== Modo oscuro =====
const btnTema = document.getElementById("btn-tema");

function leerTema() {
  try { return localStorage.getItem("tema"); } catch (e) { return null; }
}
function guardarTema(valor) {
  try { localStorage.setItem("tema", valor); } catch (e) { /* sin almacenamiento */ }
}

if (leerTema() === "oscuro") {
  document.body.classList.add("oscuro");
}

function actualizarIcono() {
  if (btnTema) btnTema.textContent = document.body.classList.contains("oscuro") ? "☀️" : "🌙";
}
actualizarIcono();

if (btnTema) {
  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
    guardarTema(document.body.classList.contains("oscuro") ? "oscuro" : "claro");
    actualizarIcono();
  });
}

// ===== Botón para volver arriba =====
const btnArriba = document.getElementById("btn-arriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    btnArriba.classList.add("visible");
  } else {
    btnArriba.classList.remove("visible");
  }
});

btnArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Botón copiar en los bloques de código =====
document.querySelectorAll(".codigo").forEach(bloque => {
  const boton = document.createElement("button");
  boton.textContent = "Copiar";
  bloque.appendChild(boton);

  boton.addEventListener("click", () => {
    const texto = bloque.querySelector("code").innerText;
    navigator.clipboard.writeText(texto).then(() => {
      boton.textContent = "¡Copiado!";
      setTimeout(() => (boton.textContent = "Copiar"), 1500);
    }).catch(() => {
      boton.textContent = "Error";
    });
  });
});

// ===== Buscador de temas (solo en la página de inicio) =====
const buscador = document.getElementById("buscador");

if (buscador) {
  buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();
    document.querySelectorAll(".tarjeta").forEach(tarjeta => {
      const texto = tarjeta.innerText.toLowerCase();
      tarjeta.style.display = texto.includes(filtro) ? "" : "none";
    });
  });
}
