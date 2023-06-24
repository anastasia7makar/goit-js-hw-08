import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const KEY_FEEDBACK = 'feedback-form-state';

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handlerSubmit);

const localProperty =
  JSON.parse(window.localStorage.getItem(KEY_FEEDBACK)) ?? null;

if (localProperty) {
  for (const key of Object.keys(localProperty)) {
    form.elements[key].value = localProperty[key];
  }
}

function getData() {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

function handleInput(e) {
  window.localStorage.setItem(KEY_FEEDBACK, JSON.stringify(getData()));
}

function handlerSubmit(e) {
  e.preventDefault();
  console.log(getData());
  window.localStorage.removeItem(KEY_FEEDBACK);
  form.reset();
}
