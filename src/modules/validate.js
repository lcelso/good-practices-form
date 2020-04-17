export function Validate() {
  const apllyError = (elementErrors) => {
    const { checkboxs, inputs } = elementErrors;
    const element = document.querySelectorAll(
      `[value='${checkboxs[0].value}']`
    )[0];

    element.closest("[required]").classList.add("valid-error");
  };

  const createInvalidObject = (checkboxs, inputs) => {
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
      const { value, checked } = item;

      elementsGroup.push({
        value,
        checked,
      });
    });

    const elementValid = elementsGroup.filter(
      (item) => item.checked === true
    )[0];

    if (elementValid?.checked === true) return null;
    return elementsGroup;
  };

  const findAndVerifyElements = (elements) => {
    const elCheckboxs = [];
    const elInputs = [];

    elements.forEach((el) => {
      const { tagName: tag, value, name } = el;

      if (tag === "UL") {
        elCheckboxs.push(elementFilter(el.querySelectorAll("input")));
      }

      if (tag === "INPUT" && parseInt(value) === 0) {
        elInputs.push(name);
      }
    });

    return createInvalidObject(elCheckboxs[0], elInputs);
  };

  const init = () => {
    const elements = document.querySelectorAll("[required]");

    findAndVerifyElements(elements);
  };

  init();
}
