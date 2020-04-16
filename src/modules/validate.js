export function Validate() {
  const elments = document.querySelectorAll("[required]");
  const objValid = [];
  const objLength = [];

  elments.forEach((el) => {
    console.log(el.querySelectorAll("input"));
    objValid.push({
      type: el.type,
      checked:
        el.type === "checkbox" || el.type === "radio" ? el.checked : null,
      value: el.type === "input" || el.type === "select-one" ? el.value : null,
      selectedIndex: el.type === "select-one" ? el.selectedIndex : null,
    });
  });

  objValid.forEach((obj) => {
    console.log(obj);
  });
  // console.log(objValid.length);

  objValid.forEach((obj) => {
    // console.log(obj.checked);
    // if (obj.type === 'checkbox' && obj.checked)
  });
}
