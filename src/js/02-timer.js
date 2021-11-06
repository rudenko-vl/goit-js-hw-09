import { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
    picker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    valueDays: document.querySelector('span[data-days]'),
    valueHours: document.querySelector('span[data-hours]'),
    valueMinutes: document.querySelector('span[data-minutes]'),
    valueSeconds: document.querySelector('span[data-seconds]'),
};

refs.btnStart.classList.add('btn');
refs.btnStart.setAttribute('disabled', true);
let intervalId = null;
let selectedTime = null;
let isActive = false;

flatpickr(refs.picker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime = Number(selectedDates[0]);
        if (selectedTime < Date.now()) {
            Notify.failure('Please choose a date in the future');
            return;
        } 
        
        refs.btnStart.removeAttribute('disabled');
        const deltaTime = selectedTime - Date.now();
        const differenceTime = convertMs(deltaTime);
        updateClockface(differenceTime);
    }
});

refs.btnStart.addEventListener('click', startTimer);
function startTimer() {
    if (isActive) {
        return;
    }
    isActive = true; 
    intervalId = setInterval(() => {
        if (selectedTime < Date.now()) {
            clearInterval(intervalId);
            return;
        }
        const deltaTime = selectedTime - Date.now();
        const differenceTime = convertMs(deltaTime);
        updateClockface(differenceTime);
    }, 1000)
    Notify.success('Timer started!');
    refs.btnStart.setAttribute('disabled', true);

};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function updateClockface({ days, hours, minutes, seconds }) {
    refs.valueDays.textContent = `${days}`;
    refs.valueHours.textContent = `${hours}`;
    refs.valueMinutes.textContent = `${minutes}`;
    refs.valueSeconds.textContent = `${seconds}`;
};