const API_KEY = "8b3b3414655d073e7eff150517f7b9eb";
const URL_BASE = "https://api.themoviedb.org/3/search/movie";
const URL_IMG = "https://image.tmdb.org/t/p/w200";

document.getElementById("searchButton").addEventListener("click", buscarPeliculas);

let resultadosContainer = document.getElementById("results");
resultadosContainer.innerHTML = "";

function buscarPeliculas() {
  let inputBusqueda = document.getElementById("searchInput").value;
  resultadosContainer.innerHTML = "UN MOMENTO ESTAMOS BUSCANDO LA PELICULA ...";

  fetch(URL_BASE + "?query=" + inputBusqueda + "&api_key=" + API_KEY)
    .then((respuesta) => respuesta.json()) //primera promesa, que los datos vengan en un json
    .then((respuesta) => {
      resultadosContainer.innerHTML = "";
      mostrarPeliculas(respuesta.results);
    });
}

function mostrarPeliculas(peliculasObtenidas) {
  console.log(peliculasObtenidas);

  if (peliculasObtenidas.length === 0) {
    resultadosContainer.innerHTML =
      " <p> No pudimos encontrar resultados para tu busqueda</p>";
    return; // para que me deje dejar de ejecutar codigo y salga de la funcion principal
  }

  //SI HAY MAS DE UNA PELICULA ENTOCES LAS RECORREMOS Y CREAMOS UN ELEMENTO PARA MOSTRARLA
  peliculasObtenidas.forEach((pelicula) => {
    let contenedor_pelicula = document.createElement("div");
    contenedor_pelicula.classList.add("movie");

    let imagen = document.createElement("img");
    imagen.src = URL_IMG + pelicula.poster_path;

    let titulo = document.createElement("h2");
    titulo.textContent = pelicula.title;

    let lanzamiento = document.createElement("p");
    lanzamiento.textContent ="la fecha de lanzamiento fue: " + pelicula.release_date;

    let descripcion = document.createElement("p");
    descripcion.textContent = pelicula.overview;

    resultadosContainer.appendChild(contenedor_pelicula);
    contenedor_pelicula.appendChild(imagen);
    contenedor_pelicula.appendChild(titulo);
    contenedor_pelicula.appendChild(lanzamiento);
    contenedor_pelicula.appendChild(descripcion);
  });
}
