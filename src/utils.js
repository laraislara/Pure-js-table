import namor from 'namor';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    Name: namor.generate({ words: 2, numbers: 0 }).replace('-', ' '),
    Position: namor.generate({ words: 1, numbers: 0 }),
    Office: Math.floor(Math.random() * (600 - 100)) + 100,
    Age: Math.floor(Math.random() * (60 - 18)) + 18,
    'Start Date': new Date(
      +new Date() - Math.floor(Math.random() * 10000000000),
    ).toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }),
    Salary: `$ ${Math.floor(Math.random() * 1000)}`,
  };
};

const makeData = (len = 555) => {
  return range(len).map(() => {
    return {
      ...newPerson(),
    };
  });
};
/**
 * Adds eventlistener to specified node
 * @param { Element } node - element to listen
 * @param { string } event - event to trigger listener
 * @param { function } fn - function attached to listener
 * @param { Element|int } params - params to provide with fn as args
 */
const addSimpleEventListener = (node, event, fn, ...params) => {
  node.addEventListener(event, () => fn(...params));
};

const toRusLocaleDate = text => {
  if (text.split('.').length !== 3) {
    throw 1;
  }
  const [d, m, y] = text.split('.');
  return new Date(y, m, d);
};

const isRusLocaleDate = text => {
  try {
    toRusLocaleDate(text);
    return true;
  } catch (err) {
    return false;
  }
};

export { makeData, addSimpleEventListener, toRusLocaleDate, isRusLocaleDate };
