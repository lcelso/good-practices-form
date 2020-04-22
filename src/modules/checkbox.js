import { fnAddEventListener, toogleClass, toogleAtribute } from "./binds";
import { Const } from "./configs";

export function ChangeCheckbox() {
  const { ELEMENT_CHECKBOX, CLASS_VALID_ERROR } = Const();
  let arrayCheckbox = document.querySelectorAll(ELEMENT_CHECKBOX);
  let qtyChecked = 0;

  const verify = (_, element) => {
    const elSpan = element.parentNode.querySelector("[aria-labelledby]");
    const elList = elSpan.closest("[required]");   
    const elDisabled = elSpan.getAttribute("aria-disabled");

    if (!elDisabled) {
      switch (elSpan.getAttribute("aria-checked")) {
        case "true":
          --qtyChecked;
          toogleAtribute(elSpan, "aria-checked", "false");

          if (qtyChecked <= 0) {
            toogleClass(elList, CLASS_VALID_ERROR);
            elList.classList.add(CLASS_VALID_ERROR);
          }          
          break;
        case "false":
          ++qtyChecked;
          toogleAtribute(elSpan, "aria-checked", "true");

          if (qtyChecked >= 1) {
            elList.classList.remove(CLASS_VALID_ERROR);
          }          
          break;
      }
    }
  };

  const elementClickBindEvents = fnAddEventListener(["click"], verify);
  const elementKeyBindEvents = fnAddEventListener(["keypress"], verify);

  arrayCheckbox.forEach((item) => {
    elementClickBindEvents(item)(item);
    elementKeyBindEvents(item)(item);
  });
}
