function confirmDeletion() {
  if (confirm("Are you sure you want to delete this project?")) return true;
  else {
    //tell page that to stop what it's doing (page will not post)
    event.stopPropagation();
    event.preventDefault();
  }
}

function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  // Remove all existing TRs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // Re-add the newly sorted rows
  tBody.append(...sortedRows);

  // Remember how the column is currently sorted
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

//Javascript file to take global header and footer section on each page

//Fetching data from header.html file.
fetch("./header.html")
  .then((response) => {
    return response.text();
  })
  //Data return to the header tag of html file.
  .then((data) => {
    document.querySelector("header").innerHTML = data;
  });

fetch("./footer.html")
  .then((response) => {
    return response.text();
  })

  //Data return to the footer tag of html file.
  .then((data) => {
    document.querySelector("footer").innerHTML = data;
  });
