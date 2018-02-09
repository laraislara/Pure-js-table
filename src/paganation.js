import { addSimpleEventListener } from './utils';

const spawnPageButtons = (paginationNode, pagesAmount) => {
  let pageButtons = '';
  let isShowLastPage = false;
  const buttonsLimit = 6;
  const lastPage = pagesAmount;
  if (pagesAmount > buttonsLimit) {
    isShowLastPage = true;
  }

  pageButtons += `<input type="button" class="previous" value="Previous" title="previous page">`;
  for (let idx = 1; idx <= pagesAmount; idx++) {
    const className = idx > buttonsLimit ? 'hidden' : '';
    pageButtons += `<input type="button" class="page-button ${className}" value="${idx}" title="page ${idx}">`;
  }
  if (isShowLastPage) {
    pageButtons += `
       <b>...</b> <input type="button" class="page-button"
                         value="${lastPage}" title="page ${lastPage}" onclick="">
    `;
  }
  pageButtons += `<input type="button" class="next" value="Next" title="next page">`;
  paginationNode.innerHTML = pageButtons;
};

const getPage = (trNodes, rowsPerPage, page, pageButtons, isLast) => {
  for (const [idx, tr] of trNodes.entries()) {
    const headIdx = rowsPerPage * page - rowsPerPage;
    const tailIdx = rowsPerPage * page;

    if (idx >= headIdx && idx < tailIdx) {
      tr.classList.remove('hidden');
    } else {
      tr.classList.add('hidden');
    }
    for (const button of pageButtons) {
      button.classList.remove('current');
    }
    if (!isLast && pageButtons[page - 1]) {
      pageButtons[page - 1].classList.add('current');
    } else if (isLast && pageButtons[pageButtons.length - 1]) {
      pageButtons[pageButtons.length - 1].classList.add('current');
    }
  }
};

const addGetPageClickListener = (node, ...params) => {
  addSimpleEventListener(node, 'click', getPage, ...params);
};

const getPagesAmount = (trNodes, rowsPerPage) => {
  return Math.ceil(trNodes.length / rowsPerPage.value);
};

const getTrNodes = table => {
  return [...table.querySelectorAll('tr.row')];
};

/**
 * Fetches rows per page value from corresponding picker node,
 * counts pages and show appropriate rows. Other rows will be hided.
 * @param { Element } table - Table to search
 * @param { Element } paginationNode - pagination container node
 * @param { Element } rowsPerPagePicker - rows per page picker node
 */
const paginate = (table, paginationNode, rowsPerPagePicker) => {
  const rowsPerPage = rowsPerPagePicker.value;
  const trNodes = getTrNodes(table);
  const pagesAmount = getPagesAmount(trNodes, rowsPerPagePicker);
  spawnPageButtons(paginationNode, pagesAmount);

  const pagesButtons = document.querySelectorAll('.pagination .page-button');
  const PagesButtonsLength = pagesButtons.length;
  for (const [idx, button] of pagesButtons.entries()) {
    addGetPageClickListener(
      button,
      trNodes,
      rowsPerPage,
      idx + 1,
      pagesButtons,
    );
    // properly set page number to last page button
    if (idx + 1 === PagesButtonsLength) {
      addGetPageClickListener(
        button,
        trNodes,
        rowsPerPage,
        pagesAmount,
        pagesButtons,
        true,
      );
    }
    getPage(trNodes, rowsPerPage, 1, pagesButtons);
  }
};

const updatePrevNext = (table, paginationNode, rowsPerPage) => {
  const trNodes = getTrNodes(table);
  const pagesButtons = paginationNode.querySelectorAll('.page-button');
  const currButton = paginationNode.querySelector('.current');
  const nextButton = paginationNode.querySelector('.next');
  const prevButton = paginationNode.querySelector('.previous');
  const pagesAmount = getPagesAmount(trNodes, rowsPerPage);
  const currPage = currButton.value;
  if (Number(currPage) === Number(pagesButtons[0].value)) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
    addGetPageClickListener(
      prevButton,
      trNodes,
      rowsPerPage.value,
      Number(currButton.value) - 1,
      pagesButtons,
    );
  }
  if (Number(currPage) === pagesAmount) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
    addGetPageClickListener(
      nextButton,
      trNodes,
      rowsPerPage.value,
      Number(currButton.value) + 1,
      pagesButtons,
    );
  }
};

export { updatePrevNext, paginate };
