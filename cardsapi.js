const BASE_URL = 'https://deckofcardsapi.com/api/deck'


// 1.
axios.get(`${BASE_URL}/new/draw/?count=1`)
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
    });


// 2.
let card1 = null;
axios.get(`${BASE_URL}/new/draw/?count=1`)
    .then(res => {
        card1 = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
        return axios.get(`${BASE_URL}/${res.data.deck_id}/draw/?count=1`)
    })
    .then(res => {
        let card2 = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
        console.log(card1);
        console.log(card2);
    });


// 3.
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

axios.get(`${BASE_URL}/new/shuffle`)
    .then(res => {
        deckId = res.data.deck_id;
        $btn.show();
    });

$btn.on('click', function() {
    axios.get(`${BASE_URL}/${deckId}/draw/`)
        .then(res => {
            let cardImg = res.data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardImg,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if(res.data.remaining === 0) $btn.remove();
        });
});