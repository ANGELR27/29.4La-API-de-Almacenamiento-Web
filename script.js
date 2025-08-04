// 1. Elementos del DOM
const input = document.getElementById("pokemonInput");
const buscarBtn = document.getElementById("buscarBtn");
const favoritoBtn = document.getElementById("favoritoBtn");
const nombreEl = document.getElementById("nombrePokemon");
const imagenEl = document.getElementById("imagenPokemon");
const tarjeta = document.getElementById("tarjeta");
const listaFavoritos = document.getElementById("listaFavoritos");

let pokemonActual = null;

buscarBtn.addEventListener("click", () => {
  const nombre = input.value.toLowerCase().trim();
  if (!nombre) {
    alert("Por favor escribe un nombre.");
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then((response) => {
      if (!response.ok) throw new Error("Pokémon no encontrado");
      return response.json();
    })
    .then((data) => {
      pokemonActual = data.name;
      nombreEl.textContent = data.name.toUpperCase();
      imagenEl.src = data.sprites.front_default;
      tarjeta.style.display = "block";
    })
    .catch((err) => {
      alert(err.message);
      tarjeta.style.display = "none";
    });
});

favoritoBtn.addEventListener("click", () => {
  if (!pokemonActual) return;

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favoritos.includes(pokemonActual)) {
    favoritos.push(pokemonActual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
  } else {
    alert("Ya está en favoritos");
  }
});

function mostrarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  listaFavoritos.innerHTML = "";

  favoritos.forEach((nombre) => {
    const li = document.createElement("li");
    li.textContent = nombre;
    listaFavoritos.appendChild(li);
  });
}

mostrarFavoritos();
