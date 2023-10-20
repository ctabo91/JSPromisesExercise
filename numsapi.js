const BASE_URL = 'http://numbersapi.com'


// 1.
async function favNumFact(num){
    let res = await axios.get(`${BASE_URL}/${num}?json`);
    console.log(res.data.text);
}

favNumFact(2);


// 2.
async function multiNumFact(numArr){
    let res = await axios.get(`${BASE_URL}/${numArr}?json`);
    console.log(res.data);
}

multiNumFact([2, 5, 10]);


// 3.
let $form = $('form');

$form.on('submit', async function(e){
    e.preventDefault();
    let num = $('#fav-num').val();
    let res = await Promise.all(
        Array.from({length: 4}, () => axios.get(`${BASE_URL}/${num}?json`))
    );
    res.forEach(facts => $('#fact-area').append(`<p>${facts.data.text}</p>`));
})
