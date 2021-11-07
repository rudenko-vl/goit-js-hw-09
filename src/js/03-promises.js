import { createPromise } from './helpers/createPromise';
import { Notify } from 'notiflix';
const formRef = document.querySelector('form');
formRef.addEventListener('submit', (ev) => {
  ev.preventDefault();

  let amount = Number(ev.target.amount.value);
  let delay = Number(ev.target.delay.value);
  let step = Number(ev.target.step.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
}
});



