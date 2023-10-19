const BASE_URL = 'https://pokeapi.co/api/v2'


let pokemon = [];
for(let i = 1; i < 4; i++){
    let randomNum = Math.floor(Math.random() * 1292);
    pokemon.push(axios.get(`${BASE_URL}/pokemon/${randomNum}/`));
}

    
Promise.all(pokemon)
    .then(pokemonArr => (
        pokemonArr.forEach(p => {
            axios.get(p.data.species.url)
                .then(res => {
                    console.log(`${res.data.name}: ${res.data.flavor_text_entries[0].flavor_text}`);
                });
        })
    ));