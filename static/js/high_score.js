function generateTableHead(table, headers) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement('th');
        let text = document.createTextNode(headers[i]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, usernames, scores) {
    for (let i = 0; i < usernames.length; i++) {
        let row = table.insertRow();
        let usernameCell = row.insertCell();
        let scoreCell = row.insertCell();
        let username = document.createTextNode(usernames[i]);
        usernameCell.appendChild(username);
        let score = document.createTextNode(scores[i]);
        scoreCell.appendChild(score);
    }
}

let table = document.querySelector('Table');
let headers = ['Name', 'Score'];

generateTable(table, usernames, scores);
generateTableHead(table, headers);
