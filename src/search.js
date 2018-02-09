/**
 * Fetches search value from provided input node
 * and compare the value with each tr's text.
 * @param { Element } table - Table node to find row
 * @param { Element } input - Input node to get value
 * @param { function } cb - Cb function to execute before return
 * @param { Element } params - Arguments to provide to cb
 */
export default function search(table, input, cb, ...params) {
  // construct all table's tr
  const trNodes = [...table.querySelectorAll('tr.row')];
  // cleared search input value
  const q = input.value.trim().toLowerCase();
  if (!q) {
    // optimization for cases
    // when no value was provided
    for (const tr of trNodes) {
      tr.classList.remove('hidden');
    }
    // look after pagination
    cb(table, ...params);
    // exit function
    return;
  }
  // search if query exists in each tr node
  for (const tr of trNodes) {
    if (tr.innerText.toLowerCase().includes(q)) {
      // if q exists in tr node, then we will show the row
      tr.classList.remove('hidden');
    } else {
      // else hide entire tr node
      tr.classList.add('hidden');
    }
  }
}
