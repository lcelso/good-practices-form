import { fnAddEventListener, toogleClass } from "./binds";

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

  const decrease = () => {
    --store.counter;
  };

  const setDecrease = (counter)  => {
    if (counter.value > 0) decrease();
    if (counter.value <= 1) counter.classList.add("valid-error");
  }

  const increase = (counter) => {
    store.counter = ++counter.value;    
  };

  const setIncrease = (counter) => {
    increase(counter)
  };

  const bindEvents = (...{ 0: increment, 1: decrement, 2: elCounter }) => {    
    const verify = ({ type, key, keyCode }, choiceType) => {
      if (type === "blur") inputCounter(store);

      if (keyCode === 40 && key === "ArrowDown") {
        if (elCounter.value <= 1) elCounter.classList.add("valid-error");

        inputCounter(store);     
      }

      if (key === "ArrowUp") {
        elCounter.classList.remove("valid-error");
        inputCounter(store);
      }

      if (type === "click") {
        event.preventDefault();
        choiceType === "increase" ? setIncrease(elCounter) : setDecrease(elCounter);
        inputCounter(elCounter);

        if (store.counter >= 1) {          
          elCounter.classList.remove("valid-error");
        }
      }
    };

    const buttonBindEvents = fnAddEventListener(["click", "blur"], verify);
    buttonBindEvents(increment)("increase");
    buttonBindEvents(decrement)("decrease");

    const inputBindEvents = fnAddEventListener(["keyup", "keydown", "blur"], verify);
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
