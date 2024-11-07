const state = {
    view: {
        // squares: todos os elementos com a classe square 
        squares: document.querySelectorAll(".square"),
        // enemy: todos os elementos com a classe enemy
        enemy: document.querySelector(".enemy"),
        // timeLeft: elemento com id time-left
        timeLeft: document.querySelector("#time-left"),
        // score: elemento com id score
        score: document.querySelector("#score"),
    },
    value: {
        // posição do inimigo
        hitPosition: 0,
        // pontuação geral
        result: 0,
        // tempo restante
        currentTime: 60,
    },
    action: {
        // intervalo para reinício do countdown
        countDownTimerId: setInterval(countDown, 1000),
        // adicionando id do timer
        timerId: setInterval(randomSquare, 1000),
    },
};

// contabilizando o tempo restante
function countDown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    // alerta de fim de jogo
    if (state.value.currentTime <= 0) {
        clearInterval(state.action.countDownTimerId);
        alert("Game Over! O seu resultado foi: " + state.value.result);
    }
}

// adicionando sons
function playSound() {
    let audio = new Audio(".src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

// randomizando o quadrado para aparecer o inimigo
function randomSquare() {
    // definindo todos os quadrados como square
    state.view.squares.forEach((square) => {
        // removendo a classe enemy de todos os quadrados
        square.classList.remove("enemy");
    })

    // sorteando um número de 1 a nove, arredondando para baixo
    let randomNumber = Math.floor(Math.random() * 9);

    // assignando o número sorteado ao quadrado correspondente
    let randomSquare = state.view.squares[randomNumber];

    // adicionando a classe inimigo ao quadrado sorteado
    randomSquare.classList.add("enemy");

    // assignando o valor do quadrado escolhido ao hitPosition
    state.value.hitPosition = randomSquare.id;
}

// adicionando sensor de clique
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        // quando o mouse for clicado em um quadrado
        square.addEventListener("mousedown", () => {
            // se esse quadrado estiver na posição do inimigo
            if (square.id === state.value.hitPosition) {
                state.value.result++;
                // o texto do score terá o mesmo valor que o result
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound();
            }
        });
    });
}

// função para iniciar
function initialize() {
    addListenerHitBox();
}

// iniciando
initialize();