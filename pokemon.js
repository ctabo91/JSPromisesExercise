const BASE_URL = 'https://pokeapi.co/api/v2'


function randomNum(){
    return Math.floor(Math.random() * 1000);
}

$('button').on('click', async function(){
    $('#display-area').empty();

    let pokemon = await Promise.all([
        axios.get(`${BASE_URL}/pokemon/${randomNum()}/`),
        axios.get(`${BASE_URL}/pokemon/${randomNum()}/`),
        axios.get(`${BASE_URL}/pokemon/${randomNum()}/`)
    ]);

    pokemon.forEach(async function(p){
        let pokemonImg = p.data.sprites.front_default;
        let name = p.data.name;

        let res = await axios.get(p.data.species.url);
        let description = res.data.flavor_text_entries[0].flavor_text;

        let html = `
        <div class="card">
            <img src="${pokemonImg}" class="card-img-top" alt="${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
            </div>
        </div>
        `;
        
        $('#display-area').append(html);
    })
});