import { fnEvents } from "./binds";

export function Counter() {
  const store = {
    counter: 0,
  };

  const inputCounter = (counter) => {
    counter.value = store.counter;

    if (counter.value === "-1") {
      counter.value = 0;
    }
  };

  const decrease = (counter) => {
    if (counter.value <= 1) counter.classList.add("valid-error");
    if (counter.value > 0) --store.counter;
  };

  const increase = (counter) => {
    store.counter = ++counter.value;
    counter.classList.remove("valid-error");
  };

  const bindEvents = (...value) => {
    
    const { 0: increment, 1: decrement, 2: elCounter } = value;

    const verify = (e, type) => {
      if (e.type === "blur") inputCounter(store);
      if (e.keyCode === 40 && e.key === "ArrowDown") {
        if (elCounter.value <= 1) {
          elCounter.classList.add("valid-error");
        }
      }

      if (e.key === "ArrowUp") {
        elCounter.classList.remove("valid-error");
      }

      if (e.type === "click") {
        e.preventDefault();
        type === "increase" ? increase(elCounter) : decrease(elCounter);
        inputCounter(elCounter);
      }
    };

    const buttonBindEvents = fnEvents(["click"], verify);
    buttonBindEvents(increment)("increase");
    buttonBindEvents(decrement)("decrease");

    const inputBindEvents = fnEvents(["keyup", "keydown", "blur"], verify);
    inputBindEvents(elCounter)("increase");
    inputBindEvents(elCounter)("decrease");
    inputBindEvents(elCounter)("blur");
  };

  const init = () => {
    const elIncrement = document.getElementById("increment");
    const elDecrement = document.getElementById("decrement");
    const elCounter = document.getElementById("counter");

    bindEvents(...[elIncrement, elDecrement, elCounter]);
    inputCounter(elCounter);
  };

  init();
}
