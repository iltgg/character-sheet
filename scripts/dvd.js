var box = document.getElementById("dvd"),
  colors = [
    "#ff0000",
    "#ff4000",
    "#ff8000",
    "#ffbf00",
    "#ffff00",
    "#bfff00",
    "#80ff00",
    "#40ff00",
    "#00ff00",
    "#00ff40",
    "#00ff80",
    "#00ffbf",
    "#00ffff",
    "#00bfff",
    "#0080ff",
    "#0040ff",
    "#0000ff",
    "#4000ff",
    "#8000ff",
    "#bf00ff",
    "#ff00ff",
    "#ff00bf",
    "#ff0080",
    "#ff0040",
    "#282c34",
    "#ffffff",
  ],
  currentColor = Math.floor(Math.random() * 25 + 1),
  win = window,
  ww = win.innerWidth,
  wh = win.innerHeight,
  translateX = Math.floor(Math.random() * ww + 1),
  translateY = Math.floor(Math.random() * wh + 1),
  boxWidth = box.offsetWidth,
  boxHeight = box.offsetHeight,
  boxTop = box.offsetTop,
  boxLeft = box.offsetLeft,
  xMin = -boxLeft,
  yMin = -boxTop,
  xMax = win.innerWidth - boxLeft - boxWidth,
  yMax = win.innerHeight - boxTop - boxHeight,
  request = null,
  direction = "se",
  speed = 1,
  timeout = null;

let directions = ["ne", "nw", "se", "sw"];

// init();
onStart();

function onStart() {
  box.style.visibility = "hidden";
}

// reset constraints on resize
window.addEventListener(
  "resize",
  function (argument) {
    clearTimeout(timeout);
    timeout = setTimeout(update, 100);
  },
  false
);

box.addEventListener("click", () => {
  switchColor();
  let randomDirection = directions[Math.floor(Math.random() * 4)];
  while (randomDirection === direction) {
    randomDirection = directions[Math.floor(Math.random() * 4)];
  }
  direction = randomDirection;
  setDirection();
});

function init() {
  request = requestAnimationFrame(init);
  box.style.visibility = "visible";
  move();
  // setInterval(function() {
  //   move();
  // }, 16.66);
}

function stop() {
  cancelAnimationFrame(request);
  box.style.visibility = "hidden";
}

// reset constraints
function update() {
  xMin = -boxLeft;
  yMin = -boxTop;
  xMax = win.innerWidth - boxLeft - boxWidth;
  yMax = win.innerHeight - boxTop - boxHeight;
}

function move() {
  setDirection();
  setStyle(box, {
    transform: "translate3d(" + translateX + "px, " + translateY + "px, 0)",
  });
}

function setDirection() {
  switch (direction) {
    case "ne":
      translateX += speed;
      translateY -= speed;
      break;
    case "nw":
      translateX -= speed;
      translateY -= speed;
      break;
    case "se":
      translateX += speed;
      translateY += speed;
      break;
    case "sw":
      translateX -= speed;
      translateY += speed;
      break;
  }
  setLimits();
}

function setLimits() {
  if (translateY <= yMin) {
    if (direction == "nw") {
      direction = "sw";
    } else if (direction == "ne") {
      direction = "se";
    }
    switchColor();
  }
  if (translateY >= yMax) {
    if (direction == "se") {
      direction = "ne";
    } else if (direction == "sw") {
      direction = "nw";
    }
    switchColor();
  }
  if (translateX <= xMin) {
    if (direction == "nw") {
      direction = "ne";
    } else if (direction == "sw") {
      direction = "se";
    }
    switchColor();
  }
  if (translateX >= xMax) {
    if (direction == "ne") {
      direction = "nw";
    } else if (direction == "se") {
      direction = "sw";
    }
    switchColor();
  }
}

function switchColor() {
  var color = Math.floor(Math.random() * 26);

  while (color == currentColor) {
    color = Math.floor(Math.random() * 26);
  }

  setStyle(box, {
    color: colors[color],
  });

  currentColor = color;
}

function getVendor() {
  var ua = navigator.userAgent.toLowerCase(),
    match =
      /opera/.exec(ua) ||
      /msie/.exec(ua) ||
      /firefox/.exec(ua) ||
      /(chrome|safari)/.exec(ua) ||
      /trident/.exec(ua),
    vendors = {
      opera: "-o-",
      chrome: "-webkit-",
      safari: "-webkit-",
      firefox: "-moz-",
      trident: "-ms-",
      msie: "-ms-",
    };

  return vendors[match[0]];
}

function setStyle(element, properties) {
  var prefix = getVendor(),
    property,
    css = "";
  for (property in properties) {
    css += property + ": " + properties[property] + ";";
    css += prefix + property + ": " + properties[property] + ";";
  }
  element.style.cssText += css;
}
