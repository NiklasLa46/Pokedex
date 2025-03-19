const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = [];
let currentPokemonCount = 21;

async function fetchPokemon(id) {
  try {
    let response = await fetch(`${POKEAPI_URL}${id}`);
    let pokemonData = await response.json();
    allPokemon[id - 1] = pokemonData;
  } catch (error) {
    console.error('Pokemon konnten nicht geladen werden:', error);
  }
  renderPokemon();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadFirstPokemon() {
  for (let i = 1; i < 21; i++) {
    fetchPokemon(i);
  }
}

async function loadMorePokemon() {
  deactivateLoadMoreButton();
  showLoadingOverlay(); 
  for (let i = 0; i < 20; i++) {
    try {
      await fetchPokemon(currentPokemonCount);
      currentPokemonCount++;
    } catch (error) {
      console.error('Pokemon konnten nicht geladen werden', error);
    }
  }
  hideLoadingOverlay(); 
  activateLoadMoreButton();
}

function showLoadingOverlay() {
  document.getElementById('loadingOverlay').style.display = 'flex'; 
}

function hideLoadingOverlay() {
  document.getElementById('loadingOverlay').style.display = 'none'; 
}

function deactivateLoadMoreButton() {
  document.getElementById('loadMoreButton').disabled = true;
}

function activateLoadMoreButton() {
  document.getElementById('loadMoreButton').disabled = false;
}

function renderPokemon() {
  let content = document.getElementById('content');
  content.innerHTML = '';

  for (let i = 0; i < allPokemon.length; i++) {
    let pokemon = allPokemon[i];

    if (pokemon) {
      content.innerHTML += smallCardTemplate(pokemon, i);
    }
  }
}

function openCard(i) {
  document.getElementById('openedCard').style.display = "flex";
  document.body.classList.add('no-scroll');
  renderBigCard(i)
}

function renderBigCard(i) {
  let content = document.getElementById('cardContent')
  content.innerHTML = '';
  let pokemon = allPokemon[i]
  let abilityOne = capitalizeFirstLetter(pokemon.abilities[0].ability.name);
  let abilityTwo = pokemon.abilities[1] ? capitalizeFirstLetter(pokemon.abilities[1].ability.name) : 'N/A';
  content.innerHTML = bigCardTemplate(pokemon, i, abilityOne, abilityTwo);
}

function closeCard() {
  document.getElementById('openedCard').style.display = "none";
  document.body.classList.remove('no-scroll');
}

function searchPokemon(searchValue) {
  if (searchValue.length === 0) {
    renderPokemon();
    return; 
  }
  if (searchValue.length < 3) {
    return;
  }
  let searchedPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  renderFilteredPokemon(searchedPokemon);
}

function renderFilteredPokemon(searchedPokemon) {
  let content = document.getElementById('content');
  content.innerHTML = '';
  for (let i = 0; i < searchedPokemon.length; i++) {
    let pokemon = searchedPokemon[i];
    content.innerHTML += searchedCardTemplate(pokemon, i);
  }
}

function openPrevious(i) {
  let content = document.getElementById('cardContent');
  content.innerHTML = '';
  i--;
  if (i < 0) {
    i = allPokemon.length - 1;
  }
  let pokemon = allPokemon[i]; 
  let abilityOne = capitalizeFirstLetter(pokemon.abilities[0].ability.name);
  let abilityTwo = pokemon.abilities[1] ? capitalizeFirstLetter(pokemon.abilities[1].ability.name) : 'N/A';
  content.innerHTML = bigCardTemplate(pokemon, i, abilityOne, abilityTwo);
}

function openNext(i) {
  let content = document.getElementById('cardContent');
  content.innerHTML = '';
  i++;
  if (i === allPokemon.length) {
    i = 0;
  }
  let pokemon = allPokemon[i];
  let abilityOne = capitalizeFirstLetter(pokemon.abilities[0].ability.name);
  let abilityTwo = pokemon.abilities[1] ? capitalizeFirstLetter(pokemon.abilities[1].ability.name) : 'N/A';
  content.innerHTML = bigCardTemplate(pokemon, i, abilityOne, abilityTwo);
}

