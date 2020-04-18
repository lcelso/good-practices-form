export function Counter(increment, decrement, counter) {
  const store = {
    counter: 0,
  };

  const inputCounter = (counter) => {
    counter.value = store.counter;
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

    const fnEvents = (events) => {
      return (element) => {
        return (type) => {
          events.forEach((event) => {
            element.addEventListener(event, (e) => {
              if (e.keyCode === 40 && e.key === "ArrowDown") {
                if (elCounter.value <= 1)
                  elCounter.classList.add("valid-error");
              }

              if (e.key === "ArrowUp") {
                elCounter.classList.remove("valid-error");
              }

              if (e.type === "click" || e.type === "keypress") {
                type === "increase" ? increase(elCounter) : decrease(elCounter);
                inputCounter(elCounter);
              }
            });
          });
        };
      };
    };

    const buttonBindEvents = fnEvents(["click", "keypress"]);
    buttonBindEvents(increment)("increase");
    buttonBindEvents(decrement)("decrease");

    const inputBindEvents = fnEvents(["keyup", "keydown"]);
    inputBindEvents(elCounter)("increase");
    inputBindEvents(elCounter)("decrease");
  };

  const init = () => {
    const elIncrement = document.getElementById(increment);
    const elDecrement = document.getElementById(decrement);
    const elCounter = document.getElementById(counter);

    bindEvents(...[elIncrement, elDecrement, elCounter]);
    inputCounter(elCounter);
  };

  init();
}
