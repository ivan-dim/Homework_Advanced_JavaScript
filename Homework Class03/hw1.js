let button = document.getElementById("fetchPokemonBtn");

button.addEventListener("click", function () {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let pokemonList = document.getElementById("pokemonList");
      for (let pokemon of data.results) {
        let listItem = document.createElement("li");
        listItem.textContent = pokemon.name;
        pokemonList.appendChild(listItem);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
