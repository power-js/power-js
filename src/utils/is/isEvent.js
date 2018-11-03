import { startsWith } from '../strings';

/**
 * Determines whether the passed string is a valid event
 * @private
 * @param {String} event String containing the event
 * @return {Boolean} Returns true if the passed string is an event, else false
 */
export const isEvent = (event) => (startsWith(event, 'on') ? event.toLowerCase() : `on${event}`) in window;
