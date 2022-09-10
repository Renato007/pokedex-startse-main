const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

/*
A API Fetch fornece uma interface JavaScript para acessar e manipular partes do pipeline HTTP, tais como os pedidos e respostas. Ela também fornece o método global fetch() (en-US) que fornece uma maneira fácil e lógica para buscar recursos de forma assíncrona através da rede.
*/
const fetchPokemon = () => {
  const pokemonPromises =
    []; /* aguarda dar certo enquanto executa outras coisas */
  for (let i = 1; i <= 151; i++) {
    pokemonPromises
      .push(fetch(getPokemonUrl(i)))
      .then((response) => response.json());
  }
  /*Promise.all
  Garante a execução em paralelismo 
  */
  Promise.all(pokemonPromises).then((pokemons) => {
    /* reduzir a lista */
    const listPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

      /*
        reduzir a API pegando do objeto pokemon nome, id e imagem e colocando estes em uma lista de pokemon chamada acumulador. e cada interação já aloca-lo em um carte com titulo imagem na página do HTML . 
        */
      accumulator += `
        <li class = "card ${types[0]}">
        <img clas = "card-image" alt ="${
          pokemon.name
        }" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.id
      }.png"
        <h2 class = "card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(" | ")}</p>
        </li>`;
      return accumulator;
    }, " ");

    const ul = document.querySelector('[data = "pokedex"]');
    ul.innerHTML = listPokemons
  });
};

fetchPokemon();
