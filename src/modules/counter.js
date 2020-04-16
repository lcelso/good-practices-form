export function Counter(increment, decrement, counter) {
  const elIncrement = document.getElementById(increment);
  const elDecrement = document.getElementById(decrement);
  const elCounter = document.getElementById(counter);

  const inputCounter = () => {
    elCounter.value = store.counter;
  };

  const bindEvents = () => {
    elIncrement.addEventListener("click", () => {
      increase();
      inputCounter();
    });
    elDecrement.addEventListener("click", () => {
      decrease();
      inputCounter();
    });
  };

  const store = {
    counter: 0,
  };

  const increase = () => {
    ++store.counter;
  };

  const decrease = () => {
    if (elCounter.value > 0) --store.counter;
  };

  const init = () => {
    bindEvents();
    inputCounter();
  };

  init();
}
