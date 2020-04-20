import { fnEvents } from "./binds";
import { Const } from "./configs";

export function ChangeCheckbox() {
  const { ELEMENT_CHECKBOX, CLASS_VALID_ERROR } = Const();
  let arrayCheckbox = document.querySelectorAll(ELEMENT_CHECKBOX);
  let arrayLabel = document.querySelectorAll("label.checkbox-svg");
  let qtyChecked = 0;

  const verify = (e, item) => {
    const elSpan = item.parentNode.querySelector("[aria-labelledby]");
    const elDisabled = elSpan.getAttribute("aria-disabled");
    const iptHidden = elSpan.parentNode.querySelector("input");

    if (!elDisabled) {
      switch (elSpan.getAttribute("aria-checked")) {
        case "true":
          --qtyChecked;
          elSpan.setAttribute("aria-checked", "false");
          if (qtyChecked <= 0) {
            elSpan.closest("[required]").classList.add(CLASS_VALID_ERROR);
          }
          iptHidden.setAttribute("value", "");
          break;
        case "false":
          ++qtyChecked;
          elSpan.setAttribute("aria-checked", "true");

          if (qtyChecked >= 1) {
            elSpan.closest("[required]").classList.remove(CLASS_VALID_ERROR);
          }

          iptHidden.setAttribute(
            "value",
            elSpan.getAttribute("aria-labelledby")
          );
          break;
      }
    }
  };

  const elementClickBindEvents = fnEvents(["click"], verify);
  const elementKeyBindEvents = fnEvents(["keypress"], verify);

  arrayLabel.forEach((item) => {
    elementClickBindEvents(item)(item);
    elementKeyBindEvents(item)(item);
  });

  arrayCheckbox.forEach((item) => {
    elementKeyBindEvents(item)(item);
  });
}
