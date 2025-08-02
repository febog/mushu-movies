function filterTable() {
  const searchInput = document.getElementById("table-search-input");
  const searchString = searchInput.value.toLowerCase();
  const searchTerms = searchString.replace(/\s+/g, " ").trim().split(" ");
  const table = document.getElementById("emote-table");
  const rows = table.getElementsByTagName("tr");
  let visibleRows = 0;
  // Start search on all rows from second row onwards, to skip headers
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowCells = row.getElementsByTagName("td");
    const cellsText = [];
    // Extract text from cells
    for (let j = 0; j < rowCells.length; j++) {
      const dataCell = rowCells[j];
      if (dataCell) {
        cellsText.push(dataCell.textContent);
      }
    }
    const rowText = cellsText.join(" ");
    // Search for each filter term
    if (textContainsEveryTerm(rowText, searchTerms)) {
      row.style.display = "";
      visibleRows++;
    } else {
      row.style.display = "none";
    }
  }
  // Update the shown emotes counter
  const counter = document.getElementById("visible-emote-count");
  counter.textContent = visibleRows;
}

function textContainsEveryTerm(text, terms) {
  for (let i = 0; i < terms.length; i++) {
    const term = terms[i];
    if (text.toLowerCase().indexOf(term) < 0) {
      return false;
    }
  }
  return true;
}
