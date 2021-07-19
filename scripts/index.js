let character = {
    info: {
        uuid: '',
        type: 'clc'
    },
    name: '',
    type: '',
    class: '',
    apprehension: 0,
    wounds: {
        fatal: [''],
        dangers: ['', ''],
        pains: ['', '', ''],
        distractions: ['', '', '', ''],
        annoyances: ['', '', '', '', '']
    },
    stats: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    },
    equipment: '',
    peculiarityPoints: 0,
    statisticalTraining: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    },
    peculiarityTraining: 0,
    peculiarities: '',
    recoveringWound: '',
    weeksRequired: 0,
    skills: [[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]]
};
const selection = document.getElementById('selection');

document.body.onload = () => {
    let characterList = JSON.parse(localStorage.getItem('characterList'));

    if (characterList) {
        loadCharacters(characterList);
    }
}

function loadCharacters(characterList) {
    for (const character of characterList) {
        displayCharacter(character);
    }
}


function displayCharacter(character) {
    const divCharacter = document.createElement('div');
    const divCharacterInfo = document.createElement('div');
    const divName = document.createElement('div');
    const divType = document.createElement('div');
    const divClass = document.createElement('div');
    const divButtons = document.createElement('div');
    const link = document.createElement('a');

    divCharacter.className = 'character';
    divCharacter.setAttribute('uuid', character.info.uuid);
    divCharacterInfo.className = 'character-info';
    divName.className = 'name';
    divType.className = 'type';
    divClass.className = 'class';
    divButtons.className = 'buttons';
    link.className = 'character-link';

    divName.innerText = character.name;
    divType.innerText = character.type;
    divClass.innerText = character.class;

    link.setAttribute('href', `character-sheet.html?character=${character.info.uuid}`);

    divButtons.innerHTML = `<input type="button" value="download" class="download"><input type="button" value="delete" class="delete">`;
    divCharacterInfo.appendChild(divName);
    divCharacterInfo.appendChild(divType);
    divCharacterInfo.appendChild(divClass);

    divCharacter.appendChild(divCharacterInfo);
    divCharacter.appendChild(divButtons);
    divCharacter.appendChild(link);

    selection.appendChild(divCharacter);
}


function nukeAll() {
    let bool = confirm('Are you sure you want to delete all characters? This cannot be undone');
    if (bool === true) {
        localStorage.removeItem('characterList');
        console.log('All characters deleted');
        window.location.reload();
    } else {
        console.log('Cancelled')
    }
}

function newCharacter() {
    currentList = JSON.parse(localStorage.getItem('characterList'));
    character.info.uuid = createUUID();

    if (!currentList) {
        currentList = [];
    }
    currentList.push(character);
    localStorage.setItem('characterList', JSON.stringify(currentList));
    character.info.uuid = '';
    window.location.reload();
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const upload = document.getElementById('input');
upload.addEventListener('change', uploadCharacter);

function uploadCharacter(files) {
    let fileList = this.files;
    if (!fileList)
        fileList = files;

    if (fileList) {
        for (const file of fileList) {
            const blob = new Blob([file]);
            let x = blob.text();
            blob.text().then((value) => {
                let currentList = JSON.parse(localStorage.getItem('characterList'));

                if (!currentList) { //If local storage object does not exist initialize it
                    currentList = [];
                    currentList.push(JSON.parse(value));
                    localStorage.setItem('characterList', JSON.stringify(currentList));
                } else { //Check for matching uuid and update that character instead
                    let currentObj = JSON.parse(value);
                    let currentUuid = currentObj.info.uuid;
                    console.log(currentUuid);
                    currentList.push(currentObj);
                    for (let i = 0; i < currentList.length-1; i++) {
                        console.log(currentList[i]);
                        if (currentList[i].info.uuid == currentUuid) {
                            currentList[i] = currentObj;
                            currentList.pop();
                            console.log('here')
                        }
                    }
                    localStorage.setItem('characterList', JSON.stringify(currentList));
                }
                window.location.reload();
            });
        }
    }
}

selection.addEventListener('click', (elem) => {
    let selection = elem.target.className;
    if (selection == 'delete') {
        if (confirm(`Are you sure you want to delete ${elem.target.parentElement.parentElement.getElementsByClassName('character-info').item('0').getElementsByClassName('name').item('0').innerText}`)) {
            let characterList = JSON.parse(localStorage.getItem('characterList'));
            const deleteId = elem.target.parentElement.parentElement.getAttribute('uuid');
            for (const i in characterList) {
                if (characterList[i].info.uuid == deleteId) {
                    characterList.splice(i, 1)
                    break;
                }
            }
            localStorage.setItem('characterList', JSON.stringify(characterList));
            window.location.reload();
        }
    } else if (selection == 'download') {
        let characterList = JSON.parse(localStorage.getItem('characterList'));
        const downloadId = elem.target.parentElement.parentElement.getAttribute('uuid');
        const name = elem.target.parentElement.parentElement.getElementsByClassName('character-info').item('0').getElementsByClassName('name').item('0').innerText;
        for (const i in characterList) {
            if (characterList[i].info.uuid == downloadId) {
                downloadCharacter(`${name}.character`, JSON.stringify(characterList[i]));
                break;
            }
        }
    }
});


//File drag and drop logic
selection.addEventListener('dragenter', (e) => {
    e.stopPropagation();
    e.preventDefault();
}, false);
selection.addEventListener('dragover', (e) => {
    e.stopPropagation();
    e.preventDefault();
}, false);
selection.addEventListener('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;
    uploadCharacter(files);
}, false);



function downloadCharacter(filename, data) {
    var blob = new Blob([data], { type: 'text/csv' });
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

//nav bar

const nav = document.querySelector('body');

nav.addEventListener('click', (elem) => {
    let selection;
    if (elem.target.tagName == 'svg') {
        selection = elem.target.parentElement.id;
    } else if (elem.target.tagName == 'path') {
        selection = elem.target.parentElement.parentElement.id;
    } else if (elem.target.className == 'info-block') {
        selection = 'info';
    } else {
        selection = elem.target.id;
    }
    if (selection != undefined) {
        if (selection == 'theme') {
            toggleTheme();
        } else if (selection == 'new') {
            newCharacter();
        } else if (selection == 'info') {
            toggleInfo();
        }
    }
})

const info = document.querySelector('.info-block');
let toggled = false;
function toggleInfo() {
    if (!toggled) {
        info.style.display = 'block';
        info.children.item('0').style.display = 'block';
        toggled = !toggled;
    } else {
        info.style.display = 'none';
        info.children.item('0').style.display = 'none'
        toggled = !toggled;
    }
}

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('theme', themeName);
}// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        document.querySelector('#sun').style.display = 'none';
        document.querySelector('#moon').style.display = 'block';
    } else {
        setTheme('theme-dark');
        document.querySelector('#sun').style.display = 'block';
        document.querySelector('#moon').style.display = 'none';
    }
}// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.querySelector('#moon').style.display = 'none';
    } else {
        setTheme('theme-light');
        document.querySelector('#sun').style.display = 'none';
    }
})();