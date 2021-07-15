let character = {
    info: {
        uuid: '',
        type: ''
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

let testCharacter = {
    info: {
        uuid: 'ligma',
        type: 'clc'
    },
    name: 'Sbeve Jobs',
    type: 'Venerable Collegian',
    class: 'Investigator',
    apprehension: 12,
    wounds: {
        fatal: ['cancer'],
        dangers: ['iphone', ''],
        pains: ['5G poisoning', '', ''],
        distractions: ['', '', 'bruise from fist fight with bill gates', ''],
        annoyances: ['', '', 'paper cut', 'ate a pear', '']
    },
    stats: {
        strength: 1,
        dexterity: 3,
        constitution: 4,
        intelligence: 9,
        wisdom: 5,
        charisma: 6,
    },
    equipment: 'iphone (0)\nmac(000)\ngun',
    peculiarityPoints: 11,
    statisticalTraining: {
        strength: 2,
        dexterity: 5,
        constitution: 2,
        intelligence: 3,
        wisdom: 1,
        charisma: 4,
    },
    peculiarityTraining: 3,
    peculiarities: 'literally steve jobs',
    recoveringWound: 'dead',
    weeksRequired: 2,
    skills: [[true, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, true, false, false],
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]]
};

// HTML selectors, for setting HTML

const info = Array.from(document.querySelectorAll('#info>input'));

const apprehension = document.querySelector('#apprehension');
const wounds = Array.from(document.querySelectorAll('#wounds>div>textarea'));
const stats = Array.from(document.querySelectorAll('#stats>div>input'));
const modifiers = Array.from(document.querySelectorAll('#stats>div>div.modifier')); //html, non user input
const equipment = document.querySelector('#equipment');
const carryWeight = Array.from(document.querySelectorAll('#additional>div.carry-weight')); //html, non user input

const accumulatedTraining = Array.from(document.querySelectorAll('#prowesses * input'));
const peculiarities = document.querySelector('#peculiarities');

const skillsMod = Array.from(document.querySelectorAll('#skills span.modifier'));
const skillsPE = Array.from(document.querySelectorAll('#skills label input'));

function loadCharacter(character) {
    info[0].value = character.type;
    info[1].value = character.class;
    info[2].value = character.name;
    apprehension.value = character.apprehension;
    wounds.forEach((element) => { element.value = character.wounds[element.parentElement.id][element.getAttribute('index')] });
    stats.forEach((element) => { element.value = character.stats[element.id] });
    equipment.value = character.equipment;
    accumulatedTraining[0].value = character.peculiarityPoints;
    for (let i = 1; i <= 6; i++) {
        accumulatedTraining[i].value = character.statisticalTraining[accumulatedTraining[i].className];
    }
    accumulatedTraining[7].value = character.peculiarityTraining;
    accumulatedTraining[8].value = character.recoveringWound;
    accumulatedTraining[9].value = character.weeksRequired;
    peculiarities.value = character.peculiarities;
    skillsPE.forEach((element) => {
        let index = element.getAttribute('index').split(' ');
        element.checked = character.skills[Number(index[0])][Number(index[1])];
    })
    calcStats();
    updateTitle();
}

function calcStats() {
    let statHolder = [];
    stats.forEach((stat) => { statHolder.push(stat.valueAsNumber) }); //push stats into array
    carryWeight.forEach((element, i) => { //calc carry weight and update html
        if (statHolder[2] * (1 + (0.5 * i)) > i + 1)
            element.innerHTML = Math.floor(statHolder[2] * (1 + (0.5 * i)));
        else
            element.innerHTML = i + 1;
    })
    statHolder.forEach((stat, i) => { statHolder[i] = modifierMap(stat) }) //map each value to modifier value
    modifiers.forEach((element, i) => {//update modifiers on html
        let string = '';
        if (statHolder[i] > 0)
            string += '+';
        string += statHolder[i];
        element.innerHTML = string;
    })
    skillsMod.forEach((element, i) => { //update skills modifiers on html
        let string = '';
        if (bonusMap(statHolder, i) > 0)
            string += '+';
        string += bonusMap(statHolder, i);
        element.innerHTML = string;
    })
}

function modifierMap(stat) {
    switch (stat) {
        case 1:
            return -3;
        case 2:
        case 3:
            return -2;
        case 4:
            return -1;
        case 5:
            return 0;
        case 6:
            return 1;
        case 7:
        case 8:
            return 2;
        case 9:
        case 10:
            return 3;
        default:
            return "error";
    }
}

function bonusMap(stats, index) {
    let str = stats[0];
    let dex = stats[1];
    let con = stats[2];
    let int = stats[3];
    let wis = stats[4];
    let cha = stats[5];
    switch (index) {
        case 0:
            return Math.floor((dex + con) / 2);
        case 1:
            return wis;
        case 2:
            return Math.floor((wis + int) / 2);
        case 3:
            return Math.floor((str + con) / 2);
        case 4:
            return cha;
        case 5:
            return wis;
        case 6:
            return cha;
        case 7:
            return Math.floor((dex + int) / 2);
        case 8:
            return int;
        case 9:
            return Math.floor((wis + str) / 2);
        case 10:
            return wis;
        case 11:
            return Math.floor((int + wis) / 2);
        case 12:
            return int;
        case 13:
            return wis;
        case 14:
            return cha;
        case 15:
            return dex;
        case 16:
            return int;
        case 17:
            return dex;
        case 18:
            return wis;
        case 19:
            return Math.floor((int + wis) / 2);
        case 20:
            return str;
    }
}

function updateTitle() {
    if (character.name.replace(/\s/g, '').length)
        document.querySelector('title').innerText = character.name;
    else
        document.querySelector('title').innerText = 'Cleared Waters';
}

// Input receiving

const infoInput = document.querySelector('#info');
const characterInput = document.querySelector('#character');
const prowessesInput = document.querySelector('#prowesses');
const skillsInput = document.querySelector('#skills')

infoInput.addEventListener('input', (elem) => {
    character[elem.target.id] = elem.target.value;
    updateTitle();
});

characterInput.addEventListener('input', (elem) => {
    if (elem.target.parentElement.parentElement.id == 'wounds') {
        character.wounds[elem.target.parentElement.id][elem.target.getAttribute('index')] = elem.target.value;
    } else if (elem.target.parentElement.parentElement.id == 'stats') {
        character.stats[elem.target.id] = elem.target.value;
        calcStats();
    }
    else {
        character[elem.target.id] = elem.target.value;
    }

});

prowessesInput.addEventListener('input', (elem) => {
    if (elem.target.parentElement.id == 'statisticalTraining') {
        character.statisticalTraining[elem.target.className] = elem.target.value;
    } else {
        character[elem.target.id] = elem.target.value;
    }
});

skillsInput.addEventListener('input', (elem) => {
    let index = elem.target.getAttribute('index').split(' ');
    character.skills[Number(index[0])][Number(index[1])] = elem.target.checked;
})

const nav = document.getElementById('ui');
const characterPages = {
    character: document.getElementById('character'),
    prowesses: document.getElementById('prowesses'),
    skills: document.getElementById('skills'),
    setAll: (displaySet) => {
        characterPages.character.style.display = displaySet;
        characterPages.prowesses.style.display = displaySet;
        characterPages.skills.style.display = displaySet;
    }
}

characterPages.setAll('none');
characterPages.character.style.display = 'grid';

nav.addEventListener("click", (elem) => {
    let page = elem.target.value;
    if (page !== undefined) {
        characterPages.setAll('none');
        characterPages[page].style.display = 'grid';
    }
});