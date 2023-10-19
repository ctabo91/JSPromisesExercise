const BASE_URL = 'http://numbersapi.com'


// 1.
axios.get(`${BASE_URL}/2?json`)
    .then(res => {
        console.log(res.data.text);
    });


// 2.
axios.get(`${BASE_URL}/2,5,15?json`)
    .then(res => {
        console.log(res.data);
    });


// 3.
Promise.all(
    Array.from({length: 4}, () => {
        return axios.get(`${BASE_URL}/2?json`);
    })
).then(facts => {
    facts.forEach(res => $('body').append(`<p>${res.data.text}</p>`));
});
