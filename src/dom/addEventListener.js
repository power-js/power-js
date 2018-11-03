/**
 * Assigns a callback function to the event type on the specificed element that
 * will be called whenever the event is triggered
 * @private
 * @param {HTMLElement} element
 * @param {Event}       event
 * @param {Function}    handler
 */
export const addEventListener = (element, event, handler) => {
  const eventType = event.startsWith('on') ? event.substring(2, event.length).toLowerCase() : event;
  // invoke the callback function in the context of the DOM element
  element.addEventListener(eventType, (e) => handler.call(element, e, element));
};
