function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerID = null;
btnStart.addEventListener('click', onChangeBodyColor);
btnStop.addEventListener('click', offChangeBodyColor);

function onChangeBodyColor () {
    timerID = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
};
function offChangeBodyColor() {
    clearInterval(timerID);
    btnStart.disabled = false;
    btnStop.disabled = true;
};