export function fnEvents(events, fn) {
  return (element) => {
    return (type) => {
      events.forEach((event) => {
        element.addEventListener(event, (e) => {
          return fn(e, type);
        });
      });
    };
  };
}
