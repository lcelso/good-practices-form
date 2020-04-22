import { 
  fnAddEventListener,
  removeClass,
  removeAttribute,
} from "./binds";

export function Counter() {
  const store = {
    counter: 0,
  };

  const elIncrement = document.getElementById("increment");
  const elDecrement = document.getElementById("decrement");
  const elCounter = document.getElementById("counter");

  const inputCounter = (counter) => {
    counter.value = store.counter;

    if (counter.value === "-1") {
      counter.value = 0;
    }
  };

  const decrease = () => {
    --store.counter;
  };

  const setButtonDisabled = () => {    
    elDecrement.setAttribute("disabled", true);
  }

  const removeButtonDisabled = () => {
    removeAttribute(elDecrement, "disabled");
  }

  const setValueInputCounterValueDefault = () => {
    elCounter.value = 1;
  }

  const setDecrease = (counter)  => {
    if (counter.value > 0) decrease();
    
    if (store.counter <= 1) { 
      setValueInputCounterValueDefault()
      setButtonDisabled();
    }
  }

  const increase = (counter) => {
    store.counter = ++counter.value;        
  };

  const setRemoveErrorClass = () => {
    removeClass(elCounter, "valid-error")
  }

  const setIncrease = (counter) => {
    increase(counter);
    
    if (counter.value > 0) {
      setRemoveErrorClass(); 
      removeButtonDisabled();       
    }
  };

  const bindEvents = (...{ 0: increment, 1: decrement, 2: elCounter }) => {    
    const verify = ({ type, key, keyCode }, choiceType) => {
      const counterValue = parseInt(elCounter.value);

      if (type === "blur") { 
        store.counter = counterValue;
        if (parseInt(elCounter.value) === 0) setValueInputCounterValueDefault();
      }
      
      if (keyCode === 40 && key === "ArrowDown") {
        if (counterValue <= 1) {
          setValueInputCounterValueDefault();
          setButtonDisabled();
        }  
      }

      if (keyCode === 38 && key === "ArrowUp") {
        setRemoveErrorClass();

        if (counterValue >= 1) {
          removeButtonDisabled();
        }     
      }

      if (type === "click") {
        event.preventDefault();        

        choiceType === "increase" 
          ? setIncrease(elCounter) 
          : setDecrease(elCounter);

        inputCounter(elCounter);        
      }
    };

    const buttonBindEvents = fnAddEventListener(
      ["click", "blur"], 
      verify
    );
    buttonBindEvents(increment)("increase");
    buttonBindEvents(decrement)("decrease");

    const inputBindEvents = fnAddEventListener(
        ["keyup", "keydown", "blur"], 
        verify
    );
    inputBindEvents(elCounter)("increase");
    inputBindEvents(elCounter)("decrease");
    inputBindEvents(elCounter)("blur");
  };

  const init = () => {
    setButtonDisabled();

    bindEvents(...[elIncrement, elDecrement, elCounter]);
    inputCounter(elCounter);
  };

  init();
}
