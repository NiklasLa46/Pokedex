function smallCardTemplate(pokemon, i) {
  return `<div class="cardComplete" onclick="openCard(${i})">
    <div class="cardHeader">
        <p>#${pokemon.id}</p>
        <p class="pokemonName">${capitalizeFirstLetter(pokemon.name)}</p>
    </div>
    <div class="cardBody ${pokemon.types[0].type.name}">
        <img class="cardPokeImg" src="${pokemon.sprites.other.home.front_default}" alt="">
    </div>
    <div class="cardFooter">
        <p>${pokemon.types.map(type => type.type.name).join(', ')}</p>
    </div>
 </div>`
}

function searchedCardTemplate(pokemon, i) {
  return `<div class="cardComplete" onclick="openCard(${pokemon.id - 1})">
  <div class="cardHeader">
      <p>#${pokemon.id}</p>
      <p class="pokemonName">${capitalizeFirstLetter(pokemon.name)}</p>
  </div>
  <div class="cardBody ${pokemon.types[0].type.name}">
      <img class="cardPokeImg" src="${pokemon.sprites.other.home.front_default}" alt="">
  </div>
  <div class="cardFooter">
      <p>${pokemon.types.map(type => type.type.name).join(', ')}</p>
  </div>
</div>`
}

function bigCardTemplate(pokemon, i, abilityOne, abilityTwo) {
  return `<div class="bigCardBody ${pokemon.types[0].type.name}">
    <div class="bigCardHeader">
      <h2>#${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}</h2>
    </div>
    <div class="bigCardContent">
      <div>
        <table>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Height</td>
            <td>${pokemon.height}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>${pokemon.weight} lbs</td>
          </tr>
          <tr>
            <td>Abilities</td>
            <td>${abilityOne} <br> ${abilityTwo}</td>
          </tr>
          <tr>
            <td>HP</td>
            <td>${pokemon.stats[0].base_stat}</td>
          </tr>
          <tr>
            <td>Attack</td>
            <td>${pokemon.stats[1].base_stat}</td>
          </tr>
          <tr>
            <td>Defense</td>
            <td>${pokemon.stats[2].base_stat}</td>
          </tr>
        </table>
      </div>
      <img class="cardPokeImg" src="${pokemon.sprites.other.home.front_default}" alt=""> 
    </div>
    <div class="bigCardFooter">
    <button class="arrowButton left" onclick="openPrevious(${i})"></button>
    <button class="arrowButton right" onclick="openNext(${i})"></button>
    </div>
</div>`
}