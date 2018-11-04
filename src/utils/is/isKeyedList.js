/**
 * @param   {Array}   list
 * @return  {Boolean}
 */
export const isKeyedList = (list) => {
  if (list.length && list[0].props) {
    if (list[0].props.hasOwnProperty('key')) {
      return true;
    }

    return false;
  }

  return false;
};
