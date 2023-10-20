const BASE_URL = 'https://deckofcardsapi.com/api/deck'


// 1.
async function shuffleAndDraw(){
    let res = await axios.get(`${BASE_URL}/new/draw/`);
    let {suit, value} = res.data.cards[0];
    console.log(`${value} of ${suit}`);
}

shuffleAndDraw();


// 2.
async function drawSameDeck(){
    let card1Res = await axios.get(`${BASE_URL}/new/draw/`);
    let card2Res = await axios.get(`${BASE_URL}/${card1Res.data.deck_id}/draw/`);
    [card1Res, card2Res].forEach(card => {
        let {suit, value} = card.data.cards[0];
        console.log(`${value} of ${suit}`);
    });
}

drawSameDeck();


// 3.
async function draw(){
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckRes = await axios.get(`${BASE_URL}/new/shuffle`);
    deckId = deckRes.data.deck_id;
    $btn.show().on('click', async function() {
        let cardRes = await axios.get(`${BASE_URL}/${deckId}/draw/`);
        let cardImg = cardRes.data.cards[0].image;
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
        if(cardRes.data.remaining === 0) $btn.remove();
    });
}

draw();
