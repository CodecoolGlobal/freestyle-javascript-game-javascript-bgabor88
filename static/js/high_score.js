// The usernames, scores and dates variables created outside in html template in script tag.
let headers = ['Name', 'Score'];
let body = document.querySelector('body');

function generateElement(parent, element, nameOfClass) {
    let newElement = document.createElement(element);
    newElement.setAttribute('class', nameOfClass);
    parent.appendChild(newElement);
    return newElement;
}

function generateFullSection(mode) {
    let section = generateElement(body, 'section', 'wrapper');
    if (mode === 'easy') {
        section.classList.add('show');
    }
    let main = generateElement(section, 'main', 'row title');
    section.setAttribute('id', mode);

    function generateHeader(parent, header) {
        let ul = document.createElement('ul');
        for (let i = 0; i < header.length; i++) {
            let li = document.createElement('li');
            li.innerText = header[i];
            ul.appendChild(li);
        }
        parent.appendChild(ul);
    }

    generateHeader(main, headers);

    function generateContent(parent, data, date) {
        let parentSection = generateElement(parent, 'section', 'row-fadeIn-wrapper');
        let article = generateElement(parentSection, 'article', 'row fadeIn')
        let ul = document.createElement('ul')
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.innerText = data[i];
            ul.appendChild(li);
        }
        article.appendChild(ul);
        let ulDate = generateElement(article, 'ul', 'more-content')
        let liDate = document.createElement('li');
        liDate.innerText = 'Made at ' + date;
        ulDate.appendChild(liDate);
    }

    for (let i = 0; i < modes.length; i++) {
        if (mode === modes[i]) {
            generateContent(section, [usernames[i], scores[i]], dates[i]);
        }
    }
}

let game_modes = ['easy', 'normal', 'hard'];

function generateButtons(game_modes) {
    let section = generateElement(body, 'section', 'wrapper');
    section.classList.add('show');
    section.classList.add('buts');
    section.setAttribute('id', 'buttons');
    let main = generateElement(section, 'main', 'buttons');
    for (let i = 0; i < game_modes.length; i++) {
        let button = document.createElement('button');
        button.classList.add('button');
        if (game_modes[i] === 'easy'){
            button.classList.add('clicked');
        }
        button.setAttribute('id', game_modes[i] + '-button');
        button.innerText = game_modes[i].toUpperCase();
        main.appendChild(button);
    }
}

generateButtons(game_modes)

for (let i = 0; i < game_modes.length; i++) {
    generateFullSection(game_modes[i]);
}

let easyButton = document.getElementById('easy-button');
let normalButton = document.getElementById('normal-button');
let hardButton = document.getElementById('hard-button');
let easyTable = document.getElementById('easy');
let normalTable = document.getElementById('normal');
let hardTable = document.getElementById('hard');

easyButton.addEventListener('click', () => {
    if ('show' in easyTable.classList){
        // pass
    }else{
        easyTable.classList.add('show');
        normalTable.classList.remove('show');
        hardTable.classList.remove('show');
    }
    if ('clicked' in easyButton.classList) {
        // pass
    }else{
        easyButton.classList.add('clicked');
        normalButton.classList.remove('clicked');
        hardButton.classList.remove('clicked');
    }
})

normalButton.addEventListener('click', () => {
    if ('show' in normalTable.classList){
        // pass
    }else{
        normalTable.classList.add('show');
        easyTable.classList.remove('show');
        hardTable.classList.remove('show');
    }
    if ('clicked' in normalButton.classList) {
        // pass
    }else{
        normalButton.classList.add('clicked');
        easyButton.classList.remove('clicked');
        hardButton.classList.remove('clicked');
    }
})

hardButton.addEventListener('click', () => {
    if ('show' in hardTable.classList){
        // pass
    }else{
        hardTable.classList.add('show');
        normalTable.classList.remove('show');
        easyTable.classList.remove('show');
    }
    if ('clicked' in hardButton.classList) {
        // pass
    }else{
        hardButton.classList.add('clicked');
        normalButton.classList.remove('clicked');
        easyButton.classList.remove('clicked');
    }
})