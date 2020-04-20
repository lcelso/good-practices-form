const validate = require("./validate");

describe("Validate", () => {

  test("function called applyingErrorClass", () => {
    let mockInput = document.createElement("input");
    mockInput.setAttribute("id", "counter");
    validate.applyingErrorClass([mockInput])

    const mockElement = '<input aria-required="true" required tabindex="5" min="0" name="counter" id="counter" type="number" value="0" placeholder="0" />'

    const mockCreateElement = jest.fn();
    mockCreateElement(mockCreateElement, mockElement);
    expect(mockCreateElement).toHaveBeenCalled();
  });

  test("function called createElement containain success", () => {

    const createElement = validate.createElement("div","container-message")
    ("p")("Formulário enviado com sucesso!");

    const mockElement = '<div class="container-message"><p class="success">Formulário enviado com sucesso!</p><ul class="list-errors" /></div>'

    const mockCreateElement = jest.fn();
    mockCreateElement(mockCreateElement, mockElement);
    expect(mockCreateElement).toHaveBeenCalled();
  });

  test("function called createElement containain error", () => {

    const createElement = validate.createElement("div","container-message")
    ("p")("Favor preencher os dados");

    const mockElement = '<div class="container-message"><p class="error">Favor preencher os dados</p><ul class="list-errors" /></div>'

    const mockCreateElement = jest.fn();
    mockCreateElement(mockCreateElement, mockElement);
    expect(mockCreateElement).toHaveBeenCalled();
  });

  test("function called createInvalidElementsObject", () => {
    let mockCheckout = [
      {value: "react", checked: "false"},
      {value: "vue", checked: "false"},
      {value: "angular", checked: "false"}
    ];

    let mockInput = document.createElement("input");
    mockInput.setAttribute("id", "counter");    

    const mockApplyError = jest.fn();
    mockApplyError(mockApplyError, mockCheckout);
    expect(mockApplyError).toHaveBeenCalled();
  });

  test("function called elementFilter, with checkod not checked", () => {
    let mockCheckout = document.createElement("span");
    mockCheckout.setAttribute("role", "checkbox");
    mockCheckout.setAttribute("value", "react");
    mockCheckout.setAttribute("aria-checked", "false");

    const elementFilter = validate.elementFilter([mockCheckout]);

    expect(elementFilter).toEqual([{"checked": "false", "value": "react"}]);
  })

  test("function called elementFilter, with checkod checked", () => {
    let mockCheckout = document.createElement("span");
    mockCheckout.setAttribute("role", "checkbox");
    mockCheckout.setAttribute("value", "angular");
    mockCheckout.setAttribute("aria-checked", "true");

    const inputCounter = document.createElement("input");
    inputCounter.setAttribute("id", "counter");
    inputCounter.setAttribute("value", 10);

    const elementFilter = validate.elementFilter([mockCheckout, inputCounter]);

    expect(elementFilter).toEqual(null);
  })
});
