import { fnAddEventListener, toogleClass } from "./binds";
import { Const } from "./configs";

const {
  INPUT,
  LIST,

  CLASS_CONTAINER_MESSAGE,
  CLASS_LIST_ERROR,
  CLASS_P_ERROR,
  CLASS_P_SUCCESS,

  ELEMENT_CHECKBOX,

  MSG_INIT,
  MSG_SUCCESS,
  ERROR_MSG_LIST,
  ERROR_MSG_COUNTER,
} = Const();

const checkboxs = document.querySelectorAll(ELEMENT_CHECKBOX);
const elInputCounter = document.querySelectorAll('[id="counter"]')[0];
const elFooter = document.getElementsByTagName("footer")[0];
const containerError = document.getElementsByClassName(
  CLASS_CONTAINER_MESSAGE
);

const createElement = (container, nameClass) => {
  return (paragraph) => {
    return (phrase) => {
      const containerElement = document.createElement(container);
      const textElement = document.createElement(paragraph);
      const textContent = document.createTextNode(phrase);
      const listElement = document.createElement(LIST);

      containerElement.classList.add(nameClass);
      listElement.classList.add(CLASS_LIST_ERROR);

      textElement.classList.add(
        phrase === MSG_SUCCESS ? CLASS_P_SUCCESS : CLASS_P_ERROR
      );
      textElement.appendChild(textContent);
      containerElement.appendChild(textElement);
      containerElement.appendChild(listElement);

      return containerElement;
    };
  };
};

const updateListError = (errorsElements) => {
  if (!errorsElements) return
  const listErrors = document.getElementsByClassName(CLASS_LIST_ERROR)[0];
  let textElement = "";  

  errorsElements.forEach((element) => {
    const { type, text } = element;

    if (type === LIST) {
      textElement += `<li>${ERROR_MSG_LIST}: \n
        <strong> ${text.replace(":", "")}</strong><li>`;
    }

    if (type === INPUT) {
      textElement += `<li>${ERROR_MSG_COUNTER}: <strong> ${text.replace(":", "")}
      </strong><li>`;
    }
  });

  listErrors.innerHTML = textElement;
};

const createObjectError = (elements) => {  
  const objElements = [];
  
  elements.forEach((item) => {
    objElements.push({
      type: item.tagName,
      element: item,
      text: item.closest("fieldset").querySelector("legend").innerHTML,
    });
  });

  return objElements;
};

const applyingTextError = (element, errorsElements) => {
  if (!containerError[0]) {
    const containerErrorElement = createElement(
      "div",
      CLASS_CONTAINER_MESSAGE
    )("p")(MSG_INIT);
    element.appendChild(containerErrorElement);
  }

  updateListError(errorsElements);
};

const applyingErrorClass = (elements) => {
  elements.forEach((item) => {
    item.classList.add("valid-error");
  });
};

const apllyError = ({ checkboxs, inputs }) => {
  let elements = [];

  if (checkboxs) {
    const element = document.querySelectorAll(
      `[value='${checkboxs[0].value}']`
    )[0];
    elements = [element.closest("[required]")];
  }

  inputs.forEach((item) => {
    elements.push(item);
  });

  if (elements.length === 0) toogleClass(containerError[0], " hide");

  if (containerError.length === 0) {
    applyingErrorClass(elements);
    applyingTextError(elFooter, createObjectError(elements));
  } else {
    applyingTextError(elFooter, createObjectError(elements));
  }
};

const elementFilter = (elements) => {
  const elementsGroup = [];

  elements.forEach((item) => {
    elementsGroup.push({
      value: item.getAttribute("value"),
      checked: item.getAttribute("aria-checked"),
    });
  });

  const elementValid = elementsGroup.filter(
    (item) => item.checked === "true"
  );

  if (elementValid[0]?.checked === "true") return null;
  
  return elementsGroup;
};

const createInvalidElementsObject = (checkboxs, inputs) => {
  const objInvalid = [];

  objInvalid.push({
    checkboxs: checkboxs,
    inputs: inputs,
  });

  return apllyError(objInvalid[0]);
};

const setSuccess = () => {
  const elButtonSubmit = elFooter.querySelector("button");

  elButtonSubmit.setAttribute("disabled","")
  const containerErrorElement = createElement(
    "div",
    CLASS_CONTAINER_MESSAGE
  )("p")(MSG_SUCCESS);
  elFooter.appendChild(containerErrorElement);
};

const sendFormaData = () => {
  const checkboxData = [];
  const data = [];
  const containerMessage = document.getElementsByClassName(
    CLASS_CONTAINER_MESSAGE
  )[0];

  if (containerMessage) toogleClass(containerMessage, " hide");

  checkboxs.forEach((item) => {
    if (item.getAttribute("aria-checked") === "true") {
      checkboxData.push({
        name: item.getAttribute("name"),
        arialabelledby: item.getAttribute("aria-labelledby"),
        tabindex: item.getAttribute("tabindex"),
        value: item.getAttribute("value"),
      });
    }
  });

  data.push({
    checkboxs: checkboxData,
    counter: elInputCounter.value,
    textarea: document.querySelector('textarea').value,
  });

  setSuccess();
  console.info("Dados para enviar para o servidor:");
  console.table(data[0]);
};

const findAndVerifyElements = (...{ 0: elements, 1: type }) => {
  const elCheckboxs = [];
  const elInputs = [];

  elements.forEach((el) => {
    const { tagName: tag, value } = el;

    if (tag === LIST) {
      elCheckboxs.push(elementFilter(el.querySelectorAll(ELEMENT_CHECKBOX)));
    }

    if (tag === INPUT && parseInt(value) === 0) {
      elInputs.push(el);
    }
  });

  return elCheckboxs[0] === null && elInputs.length === 0 && type === "submit"
    ? sendFormaData()
    : createInvalidElementsObject(elCheckboxs[0], elInputs);
}

const verify = (e, type) => {
  e.preventDefault();

  const elements = document.querySelectorAll("[required]");
  findAndVerifyElements(elements, type);
};

const ValidateForm = () => {
  const buttonSumit = document.querySelector('[type="submit"]');

  const buttonBindEvents = fnAddEventListener(["click"], verify);
  buttonBindEvents(buttonSumit)("submit");
};

module.exports = {
  createElement,
  applyingErrorClass,
  updateListError,
  applyingTextError,
  createObjectError,
  apllyError,
  sendFormaData,
  setSucess: setSuccess,
  elementFilter,
  createInvalidElementsObject,
  findAndVerifyElements,
  verify,
  ValidateForm
};