let count = 0;

const recusiveTextDiff = (oldChildren, newChildren, collection) => {
  for (let i = 0, k = oldChildren.length; i < k; i++) {
    const oldItem = oldChildren[i];
    const newItem = newChildren[i];

    if (typeof(oldItem) === 'string') {
      if (oldItem !== newItem) {
        collection[collection.length] = count;
      }
    }

    if (oldItem.children) {
      recusiveTextDiff(oldItem.children, newItem.children, collection);
    }
  }

  return collection;
}

export const diffChildrenText = (oldChildren, newChildren) => {
  const collection = []

  count = 0;

  for (var i = 0, k = oldChildren.length; i < k; i++) {
    const oldItem = oldChildren[i];
    const newItem = newChildren[i];

    if (oldItem.children) {
      recusiveTextDiff(oldItem.children, newItem.children, collection);
      count++;
    }
  }

  return collection;
}
