let characterSave = {
  info: {
    uuid: "",
    type: "",
  },
  name: "",
  type: "",
  class: "",
  apprehension: 0,
  wounds: {
    fatal: [""],
    dangers: ["", ""],
    pains: ["", "", ""],
    distractions: ["", "", "", ""],
    annoyances: ["", "", "", "", ""],
  },
  stats: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  equipment: "",
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
  peculiarities: "",
  recoveringWound: "",
  weeksRequired: 0,
  skills: [
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ],
};

document.documentElement.setAttribute("theme", "theme-dark");
document.body.onload = getCharacter;

// HTML selectors, for setting HTML

const info = Array.from(document.querySelectorAll("#info>input"));

const apprehension = document.querySelector("#apprehension");
const wounds = Array.from(document.querySelectorAll("#wounds>div>textarea"));
const stats = Array.from(document.querySelectorAll("#stats>div>input"));
const modifiers = Array.from(
  document.querySelectorAll("#stats>div>div.modifier")
); //html, non user input
const equipment = document.querySelector("#equipment");
const carryWeight = Array.from(
  document.querySelectorAll("#additional>div.carry-weight")
); //html, non user input

const accumulatedTraining = Array.from(
  document.querySelectorAll("#prowesses * input")
);
const peculiarities = document.querySelector("#peculiarities");

const skillsMod = Array.from(
  document.querySelectorAll("#skills span.modifier")
);
const skillsPE = Array.from(document.querySelectorAll("#skills label input"));

function loadCharacter(character) {
  characterSave = JSON.parse(JSON.stringify(character));
  info[0].value = character.type;
  info[1].value = character.class;
  info[2].value = character.name;
  apprehension.value = character.apprehension;
  wounds.forEach((element) => {
    element.value =
      character.wounds[element.parentElement.id][element.getAttribute("index")];
  });
  stats.forEach((element) => {
    element.value = character.stats[element.id];
  });
  equipment.value = character.equipment;
  accumulatedTraining[0].value = character.peculiarityPoints;
  for (let i = 1; i <= 6; i++) {
    accumulatedTraining[i].value =
      character.statisticalTraining[accumulatedTraining[i].className];
  }
  accumulatedTraining[7].value = character.peculiarityTraining;
  accumulatedTraining[8].value = character.recoveringWound;
  accumulatedTraining[9].value = character.weeksRequired;
  peculiarities.value = character.peculiarities;
  skillsPE.forEach((element) => {
    let index = element.getAttribute("index").split(" ");
    element.checked = character.skills[Number(index[0])][Number(index[1])];
  });
  calcStats();
  updateTitle();
}

function calcStats() {
  let statHolder = [];
  stats.forEach((stat) => {
    statHolder.push(stat.valueAsNumber);
  }); //push stats into array
  carryWeight.forEach((element, i) => {
    //calc carry weight and update html
    if (statHolder[2] * (1 + 0.5 * i) > i + 1)
      element.innerHTML = Math.floor(statHolder[2] * (1 + 0.5 * i));
    else element.innerHTML = i + 1;
  });
  statHolder.forEach((stat, i) => {
    statHolder[i] = modifierMap(stat);
  }); //map each value to modifier value
  modifiers.forEach((element, i) => {
    //update modifiers on html
    let string = "";
    if (statHolder[i] > 0) string += "+";
    string += statHolder[i];
    element.innerHTML = string;
  });
  skillsMod.forEach((element, i) => {
    //update skills modifiers on html
    let string = "";
    if (bonusMap(statHolder, i) > 0) string += "+";
    string += bonusMap(statHolder, i);
    element.innerHTML = string;
  });
}

function modifierMap(stat) {
  if (stat>17){
    if (stat % 2 === 1){
        return stat-11;
    }
    return stat-10;
  }
  switch (stat) {
    case -7:
    case -6:
        return -8;
    case -5:
        return -7;
    case -4:
    case -3:
        return -6;
    case -2:
    case -1:
        return -5;
    case 0:
        return -4;
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
    case 11:
    case 12:
        return 4;
    case 13:
    case 14:
        return 5;
    case 15:
        return 6;
    case 16:
    case 17:
        return 7;
    default:
      return 0;
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
  if (characterSave.name.replace(/\s/g, "").length)
    document.querySelector("title").innerText = characterSave.name;
  else document.querySelector("title").innerText = "Cleared Waters";
}

//character logic

function getCharacter() {
  let characterUUID = window.location.search.split("=")[1];
  if (!characterUUID) window.location.replace("index.html");

  const characterList = JSON.parse(localStorage.getItem("characterList"));
  let index;
  for (const i in characterList) {
    if (characterList[i].info.uuid == characterUUID) {
      index = i;
      break;
    }
  }
  loadCharacter(characterList[index]);
}

function saveCharacter(character) {
  let characterUUID = window.location.search.split("=")[1];
  if (!characterUUID) window.location.replace("index.html");

  const characterList = JSON.parse(localStorage.getItem("characterList"));
  let index;
  for (const i in characterList) {
    if (characterList[i].info.uuid == characterUUID) {
      index = i;
      break;
    }
  }
  characterList[index] = characterSave;
  localStorage.setItem("characterList", JSON.stringify(characterList));
}

// Input receiving

const infoInput = document.querySelector("#info");
const characterInput = document.querySelector("#character");
const prowessesInput = document.querySelector("#prowesses");
const skillsInput = document.querySelector("#skills");

// Blocks non number input in number inputs, stack overflow pog
// https://stackoverflow.com/questions/19966417/prevent-typing-non-numeric-in-input-type-number
const numInput = Array.from(document.querySelectorAll("input[type=number]"));
numInput.forEach((elem) => {
  elem.addEventListener("keydown", function (e) {
    var allowedChars = "-0123456789";
    function contains(stringValue, charValue) {
      return stringValue.indexOf(charValue) > -1;
    }
    var invalidKey =
      (e.key.length === 1 && !contains(allowedChars, e.key)) ||
      (e.key === "." && contains(e.target.value, "."));
    invalidKey && e.preventDefault();
  });
});

infoInput.addEventListener("input", (elem) => {
  characterSave[elem.target.id] = elem.target.value;
  updateTitle();
  saveCharacter(characterSave);
});

characterInput.addEventListener("input", (elem) => {
  if (elem.target.parentElement.parentElement.id == "wounds") {
    characterSave.wounds[elem.target.parentElement.id][
      elem.target.getAttribute("index")
    ] = elem.target.value;
  } else if (elem.target.parentElement.parentElement.id == "stats") {
    if (elem.target.value < -7) {
    } else {
      characterSave.stats[elem.target.id] = elem.target.value;
      calcStats();
    }
  } else {
    characterSave[elem.target.id] = elem.target.value;
  }
  saveCharacter(characterSave);
});

prowessesInput.addEventListener("input", (elem) => {
  if (elem.target.parentElement.id == "statisticalTraining") {
    characterSave.statisticalTraining[elem.target.className] =
      elem.target.value;
  } else {
    characterSave[elem.target.id] = elem.target.value;
  }
  saveCharacter(characterSave);
});

skillsInput.addEventListener("input", (elem) => {
  let index = elem.target.getAttribute("index").split(" ");
  characterSave.skills[Number(index[0])][Number(index[1])] =
    elem.target.checked;
  saveCharacter(characterSave);
});

// temp ui

const nav = document.getElementById("ui");
const characterPages = {
  character: document.getElementById("character"),
  prowesses: document.getElementById("prowesses"),
  skills: document.getElementById("skills"),
  setAll: (displaySet) => {
    characterPages.character.style.display = displaySet;
    characterPages.prowesses.style.display = displaySet;
    characterPages.skills.style.display = displaySet;
  },
};

characterPages.setAll("none");
characterPages.character.style.display = "grid";

nav.addEventListener("click", (elem) => {
  let selection;
  if (elem.target.tagName == "svg") {
    selection = elem.target.parentElement.id;
  } else if (elem.target.tagName == "path") {
    selection = elem.target.parentElement.parentElement.id;
  } else {
    selection = elem.target.id;
  }
  if (selection != undefined) {
    if (selection == "theme") {
      toggleTheme();
    } else if (selection == "characterS") {
      characterPages.setAll("none");
      characterPages.character.style.display = "grid";
    } else if (selection == "prowessesS") {
      characterPages.setAll("none");
      characterPages.prowesses.style.display = "grid";
    } else if (selection == "skillsS") {
      characterPages.setAll("none");
      characterPages.skills.style.display = "grid";
    } else if (selection == "download") {
      downloadCharacter(
        `${characterSave.name}.character`,
        JSON.stringify(characterSave)
      );
    } else if (selection == "home") {
      window.location.href = "index.html";
    }
  }
});

function downloadCharacter(filename, data) {
  var blob = new Blob([data], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.setAttribute("theme", themeName);
} // function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
    document.querySelector("#sun").style.display = "none";
    document.querySelector("#moon").style.display = "block";
  } else {
    setTheme("theme-dark");
    document.querySelector("#sun").style.display = "block";
    document.querySelector("#moon").style.display = "none";
  }
} // Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
    document.querySelector("#moon").style.display = "none";
  } else {
    setTheme("theme-light");
    document.querySelector("#sun").style.display = "none";
  }
})();

function download(character) {}
