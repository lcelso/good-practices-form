export function ChangeCheckbox() {
  const fnEvents = (...events) => {
    const { 0: araryEvents, 1: element } = events;

    araryEvents.forEach((event) => {
      element.forEach((item) => {
        item.addEventListener(event, () => {
          const elSpan = item.parentNode.querySelector("[aria-labelledby]");
          const elDisabled = elSpan.getAttribute("aria-disabled");
          const iptHidden = elSpan.parentNode.querySelector("input");

          if (!elDisabled) {
            switch (elSpan.getAttribute("aria-checked")) {
              case "true":
                elSpan.setAttribute("aria-checked", "false");
                iptHidden.setAttribute("value", "");
                break;
              case "false":
                elSpan.setAttribute("aria-checked", "true");
                elSpan.closest("[required]").classList.remove("valid-error");
                iptHidden.setAttribute(
                  "value",
                  elSpan.getAttribute("aria-labelledby")
                );
                break;
            }
          }
        });
      });
    });
  };

  let arrayCheckbox = document.querySelectorAll('span[role="checkbox"]');
  let arrayLabel = document.querySelectorAll("label.checkbox-svg");
  let arrayElements = [...arrayCheckbox, ...arrayLabel];

  fnEvents(...[["click", "keypress"], arrayElements]);
}
