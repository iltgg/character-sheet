let characterList

//nav bar

const nav = document.getElementById('ui');

nav.addEventListener('click', (elem) => {
    let selection;
    if (elem.target.tagName == 'svg') {
        selection = elem.target.parentElement.id;
    } else if (elem.target.tagName == 'path') {
        selection = elem.target.parentElement.parentElement.id;
    } else {
        selection = elem.target.id;
    }
    if (selection != undefined) {
        if (selection == 'theme') {
            toggleTheme();
        }
    }
})


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