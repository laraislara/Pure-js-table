import { addSimpleEventListener, makeData } from './utils';
import sortTable from './sortTable';
import { paginate, updatePrevNext } from './paganation';
import search from './search';

// generate random data
const data = makeData();

// get table node
const table = document.getElementById('table');

const makeHeader = headers => {
  const header = headers
    .map((el, idx) => {
      return `
      <th class="header-${idx}">${el}</th>
    `;
    })
    .join('');

  return `<tr class="header">${header}</tr>`;
};

// determine headers
const headers = Object.keys(data[0]);

const makeRow = i => {
  const row = headers
    .map(el => {
      return `
      <td class="${el}">${data[i][el]}</td>
    `;
    })
    .join('');

  return `<tr class="row">${row}</tr>`;
};

const makeRows = data => {
  return data
    .map((el, idx) => {
      return makeRow(idx);
    })
    .join('');
};

const fillTable = () => {
  const header = makeHeader(headers);
  const rows = makeRows(data);
  table.innerHTML = `<thead>${header}</thead> <tbody>${rows}</tbody>`;
};

// search button node
const searchButton = document.querySelector('.search');
// search button input node
const input = document.querySelector('input[type=search]');

// pagination container node
const paginationContainer = document.querySelector('.pagination');
// rows per page picker node
const rowsPerPagesPicker = document.querySelector('.rows-per-page');

addSimpleEventListener(
  rowsPerPagesPicker,
  'change',
  paginate,
  table,
  paginationContainer,
  rowsPerPagesPicker,
);

addSimpleEventListener(
  paginationContainer,
  'click',
  updatePrevNext,
  table,
  paginationContainer,
  rowsPerPagesPicker,
);

searchButton.addEventListener('click', e => {
  e.preventDefault();
  search(table, input, paginate, paginationContainer, rowsPerPagesPicker);
});

const fillTablePromise = new Promise(res => res(fillTable()));

document.addEventListener('DOMContentLoaded', () => {
  fillTablePromise.then(() => {
    paginate(table, paginationContainer, rowsPerPagesPicker);
    updatePrevNext(table, paginationContainer, rowsPerPagesPicker);
    for (const i in headers) {
      const header = table.querySelector(`.header-${i}`);
      header.addEventListener('click', () => {
        sortTable(table, header.cellIndex);
        paginate(table, paginationContainer, rowsPerPagesPicker);
      });
    }
  });
});
