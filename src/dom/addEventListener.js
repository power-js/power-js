/**
 * Helpers proxy to handle binding/unbinding listeners
 * @param  {Object} e Event object
 * @return {Function} Event listener function
 */
export const proxyFn = function(e) {
  return this.$events[e.type](e);
};

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
  element.addEventListener(eventType, proxyFn);

  if (!element.$events) {
    element.$events = {};
  }

  element.$events[eventType] = handler;
};
