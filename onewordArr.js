
//1b use a form to add new entities
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.words = [];
    }
  
    addWord(word) {
      this.words.push(word);
    }

    deleteWord(word) {
        let index = this.words.indexOf(word);
        this.words.splice(index, 1);
    }
}
  
//1c build a way for users to update entities
class Word {
    constructor(word, date) {
        this.word = word;
        this.date = date;
    }
}

let users = [];
let userId = 0;

window.onload = function() {
    document.getElementById("new-user-name").focus();
};

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener("click", action);
    return element;
}

/*Some sort of jQuery like this-- ($("#entry").checkValidity()); -- to be incorporated to keep onClick from overridng HTML 'required' but when added it cancels out the add functionality*/
onClick("new-user", () => {
    users.push(new User(userId++, getValue("new-user-name")));
    drawDOM();
});

function getValue(id) {
    return document.getElementById(id).value;
}

/*need this to clear out table creation area*/
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function drawDOM() {
    let userDiv = document.getElementById("users");
    clearElement(userDiv);
    for (user of users) {
        let table = createUserTable(user);
        let word = document.createElement("h2");
        let deleteUser = createUserButton(user);
        user.innerHTML = `User: ${user.name}`;
        userDiv.appendChild(word);
        userDiv.appendChild(deleteUser);
        userDiv.appendChild(table);
        for (word of user.words) {
            createWordRow(user, table, word);
        }
    }
    /*need this to reset the field to blank*/
    document.getElementById("new-user-name").value = "";
}

function createWordRow(user, table, word) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = word.word;
    row.insertCell(1).innerHTML = word.date;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteWordButton(user, word));
}

function createUserTable(user) {
    let table = document.createElement("table");
    table.setAttribute("class", "table table-info table-striped table-bordered");
    let row = table.insertRow(0);
    let wordColumn = document.createElement("th");
    let dateColumn = document.createElement("th");
    wordColumn.innerHTML = "Word";
    dateColumn.innerHTML = "Date";
    row.appendChild(wordColumn);
    row.appendChild(dateColumn);
    let formRow = table.insertRow(1);
    let wordTh = document.createElement("th");
    let dateTh = document.createElement("th");
    let createTh = document.createElement("th");
    let wordInput = document.createElement("input");
    wordInput.setAttribute("id", `word-input-${user.id}`);
    wordInput.setAttribute("type", "text");
    wordInput.setAttribute("class", "form-control");
    let dateInput = document.createElement("input");
    dateInput.setAttribute("id", `date-input-${user.id}`);
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("class", "form-control");
    let newWordButton = createNewWordButton(user);
    wordTh.appendChild(wordInput);
    dateTh.appendChild(dateInput);
    createTh.appendChild(newWordButton);
    formRow.appendChild(wordTh);
    formRow.appendChild(dateTh);
    formRow.appendChild(createTh);
    return table;
}

function createNewWordButton(user) {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Add Your One Word";
    btn.onclick = () => {
        user.words.push(new Word(getValue(`word-input-${user.id}`), getValue(`date-input-${user.id}`)));
        drawDOM();
    };
    return btn;
}

function createDeleteWordButton(user, word) {
    let btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.innerHTML = "Delete Word";
    btn.onclick = () => {
        let c = confirm("Are you sure you want to delete this entry?");
        if (c == true) {
            let index = user.words.indexOf(word);
            user.words.splice(index, 1);
            drawDOM();
        }   else {
            drawDOM();  
        }
    }
    return btn;
}

function createDeleteUserButton(user) {
    let btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.innerHTML = "Delete User";
    btn.onclick = () => {
        let r = confirm("Are you sure you want to delete this user?");
        if (r == true) {
            let index = users.indexOf(user);
            users.splice(index, 1);
            drawDOM();
        }   else {
            drawDOM();
        } 
    }
    return btn;
}

