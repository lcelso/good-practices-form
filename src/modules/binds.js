export const fnAddEventListener = (events, callback) => {
  return (element) => {
    return (type) => {
      events.forEach((event) => {
        element.addEventListener(event, (e) => {
          return callback(e, type);
        });
      });
    };
  };
}

export const toogleClass = (element, className) => {
  const classes = element.className;
  const regex = new RegExp('\\b' + className + '\\b');
  const hasOne = classes.match(regex);
  className = className.replace(/\s+/g, '');

  (hasOne)
    ? element.className = classes.replace(regex, '') 
    : element.className = `${classes}  ${className}`;
}

export const toogleAtribute = (element, attr, boolean) => {
  element.setAttribute(attr, boolean);
}

export const removeAttribute = (element, attr) => {
  element.removeAttribute(attr);
}

export const removeClass = (element, className) => {
  element.classList.remove(className);
}
