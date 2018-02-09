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

const addSimpleEventListener = (node, event, fn, ...params) => {
  node.addEventListener(event, () => fn(...params));
};

export { makeData, addSimpleEventListener };
