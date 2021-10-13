// The usernames, scores and dates variables created outside in html template in script tag.
let headers = ['Name', 'Score'];
let body = document.querySelector('body');

function generateElement(parent, element, nameOfClass) {
    let newElement = document.createElement(element);
    newElement.setAttribute('class', nameOfClass);
    parent.appendChild(newElement);
    return newElement;
}

let section = generateElement(body, 'section', 'wrapper');
let main = generateElement(section, 'main', 'row title');

function generateHeader(parent, header) {
    let ul = document.createElement('ul')
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
    let ulDate = generateElement(article,'ul', 'more-content')
    let liDate = document.createElement('li');
    liDate.innerText = 'Made at' + date;
    ulDate.appendChild(liDate);
}

for (let i = 0; i < usernames.length; i++) {
    generateContent(section, [usernames[i], scores[i]], dates[i]);
}
