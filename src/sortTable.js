/**
 * Sort a table by the column specified
 * Sorting is currently either numeric or string based
 * @param { Element } table - Table node to sort
 * @param { int } col - column index
 */
import { isRusLocaleDate, toRusLocaleDate } from './utils';

export default function sortTable(table, col) {
  const up = '&#x25B2;';
  const down = '&#x25BC;';
  // initial sort direction (asc)
  let invert = false;
  // header row
  const headerNode = table.querySelector('.header');
  // clear arrow if it was previously mounted
  if (typeof table.lastColumn !== 'undefined') {
    const prior = headerNode.cells[table.lastColumn].innerHTML;
    headerNode.cells[table.lastColumn].innerHTML = prior.replace(
      /<span.*?span>/,
      '',
    );
  }
  // if we work with the column right previously
  // sort direction will be changed
  if (table.lastColumn === col) {
    invert = !table.inverted;
  }
  const arrow = invert ? up : down;
  headerNode.cells[
    col
  ].innerHTML += `<span class="sort_arrow"> ${arrow} </span>`;

  const intComp = (a, b) => {
    const one = table.rows[a].cells[col].innerHTML;
    const two = table.rows[b].cells[col].innerHTML;
    return invert ? two - one : one - two;
  };
  const strComp = (a, b) => {
    const one = table.rows[a].cells[col].innerHTML;
    const two = table.rows[b].cells[col].innerHTML;
    return invert ? two.localeCompare(one) : one.localeCompare(two);
  };
  const dateComp = (a, b) => {
    const one = toRusLocaleDate(table.rows[a].cells[col].innerHTML);
    const two = toRusLocaleDate(table.rows[b].cells[col].innerHTML);
    return invert ? two - one : one - two;
  };
  const moneyComp = (a, b) => {
    const one = Number(
      table.rows[a].cells[col].innerHTML.replace(/[^\d]+/, ''),
    );
    const two = Number(
      table.rows[b].cells[col].innerHTML.replace(/[^\d]+/, ''),
    );
    return invert ? two - one : one - two;
  };
  const headCount = table.querySelectorAll('.header').length;
  const kind = table.rows[headCount + 1].cells[col].innerHTML;
  let comp;
  if (kind.match(/[$€¢£₽]/)) {
    comp = moneyComp;
  } else if (Number(kind) === kind) {
    comp = intComp;
  } else if (isRusLocaleDate(kind)) {
    comp = dateComp;
  } else {
    comp = strComp;
  }

  // create proxy array to sort table
  let proxy = new Array(table.rows.length - headCount);

  // adjust for offset by headCount rows
  for (let i = 0; i < proxy.length; i++) {
    proxy[i] = i + headCount;
  }
  proxy.sort(comp);

  // add new body to copy our rows to
  table.appendChild(document.createElement('tbody'));

  // copy rows in sorted order
  for (const pr of proxy) {
    const n = table.rows[pr].cloneNode(true);
    table.tBodies[1].appendChild(n);
  }
  // delete original unsorted table
  table.tBodies[0].remove();

  // save settings to know whether sort order should be inverted
  table.lastColumn = col;
  table.inverted = invert;
}
