let menuPack1 = document.getElementById('pack-1');
let menuPack2 = document.getElementById('pack-2');
let menuPack3 = document.getElementById('pack-3');
let playButton = document.getElementById('play');
let easyButton = document.getElementById('easy');
let normalButton = document.getElementById('normal');
let hardButton = document.getElementById('hard');
let level1Button = document.getElementById('level1');
let level2Button = document.getElementById('level2');
let level3Button = document.getElementById('level3');
let backMainButton = document.getElementById('back-to-main');
let backToDiffButton = document.getElementById('back-to-difficulty');
let difficulty;

playButton.addEventListener('click', () => {
    menuPack1.classList.remove('show');
    menuPack2.classList.add('show');
});

easyButton.addEventListener('click', () => {
    difficulty = 'easy';
    menuPack2.classList.remove('show');
    menuPack3.classList.add('show');
});

normalButton.addEventListener('click', () => {
    difficulty = 'normal';
    menuPack2.classList.remove('show');
    menuPack3.classList.add('show');
});

backMainButton.addEventListener('click', () => {
    menuPack2.classList.remove('show');
    menuPack1.classList.add('show');
});

hardButton.addEventListener('click', () => {
    difficulty = 'hard';
    menuPack2.classList.remove('show');
    menuPack3.classList.add('show');
});

backToDiffButton.addEventListener('click', () => {
    difficulty = 'easy';
    menuPack3.classList.remove('show');
    menuPack2.classList.add('show');
});

level1Button.addEventListener('click', () => {
    window.location.href="/game/" + difficulty + "/level1";
});

level2Button.addEventListener('click', () => {
    window.location.href="/game/" + difficulty + "/level2";
});

level3Button.addEventListener('click', () => {
    window.location.href="/game/" + difficulty + "/level3";
});
