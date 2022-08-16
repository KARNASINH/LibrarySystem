/*
 * Auhor: Karnasinh Gohil
 */

//This function is reponsible to handle delete book entry.
function confirmDeletion() {
  if (confirm("Are you sure you want to delete this project?")) return true;
  else {
    //tell page that to stop what it's doing (page will not post)
    event.stopPropagation();
    event.preventDefault();
  }
}

//This function is reponsibl to handle sorting of book table.
//To sort any table you need to assign class="table-sortable" in the table tag.
//This code has been taken from https://codepen.io/dcode-software/pen/zYGOrzK
function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  //Sorting each row.
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  //Removing all existing rows from the table.
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  //Again adding sorted columns in the table.
  tBody.append(...sortedRows);

  //Remembering how the column are sorted currently.
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-desc", !asc);
}

//Main entry point of the program to sort the column.
document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});
