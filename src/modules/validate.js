export function Validate() {
  const createElement = (container, nameClass) => {
    return (paragraph) => {
      return (phrase) => {
        const containerElement = document.createElement(container);
        const textElement = document.createElement(paragraph);
        const textContent = document.createTextNode(phrase);

        containerElement.classList.add(nameClass);
        textElement.appendChild(textContent);
        containerElement.appendChild(textElement);

        return containerElement;
      };
    };
  };

  const applyingClass = (elements) => {
    elements.forEach((item) => {
      item.classList.add("valid-error");
    });
  };

  const applyingTextError = (element, errosElements) => {
    const errorElement = createElement("div", "error-container")("p")(
      "Favor preencher os dados"
    );
    element.classList.add("hide");
    element.closest("fieldset").appendChild(errorElement);
    const containerError = document.getElementsByClassName(
      "error-container"
    )[0];

    errosElements.forEach((item) => {
      const { type } = item;
      if (type === "UL") {
        const { focus, text } = item;
        const elementFocus = focus.querySelector('[role="checkbox"]');

        const textElement = document.createElement("p");
        textElement.innerHTML = `É necessario escolher ao menos um item do campo: \n
          <strong>- ${text.replace(":", "")}<strong>`;

        containerError.appendChild(textElement);
        elementFocus.focus();
      }
    });
  };

  const createObjectError = (elements) => {
    const obj = [];

    elements.forEach((item) => {
      obj.push({
        type: item.tagName,
        focus: item,
        text: item.closest("fieldset").querySelector("legend").innerHTML,
      });
    });

    return obj;
  };

  const apllyError = (elementErrors) => {
    const { checkboxs, inputs } = elementErrors;
    const textArea = document.getElementsByTagName("textarea")[0];
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

    applyingClass(elements);
    applyingTextError(textArea, createObjectError(elements));
  };

  const createInvalidElementsObject = (checkboxs, inputs) => {
    const objInvalid = [];

    objInvalid.push({
      checkboxs: checkboxs,
      inputs: inputs,
    });

    return apllyError(objInvalid[0]);
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
    )[0];

    if (elementValid?.checked === "true") return null;
    return elementsGroup;
  };

  const findAndVerifyElements = (elements) => {
    const elCheckboxs = [];
    const elInputs = [];

    elements.forEach((el) => {
      const { tagName: tag, value } = el;

      if (tag === "UL") {
        elCheckboxs.push(
          elementFilter(el.querySelectorAll('[role="checkbox"]'))
        );
      }

      if (tag === "INPUT" && parseInt(value) === 0) {
        el.addEventListener("click", function (e) {
          e.preventDefault();

          console.log(el.closest("[required]"));
        });

        elInputs.push(el);
      }
    });

    return createInvalidElementsObject(elCheckboxs[0], elInputs);
  };

  const init = () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const elements = document.querySelectorAll("[required]");
      findAndVerifyElements(elements);
    });
  };

  init();
}
