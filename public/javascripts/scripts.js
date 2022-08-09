function confirmDeletion() {
  if (confirm("Are you sure you want to delete this project?")) return true;
  else {
    //tell page that to stop what it's doing (page will not post)
    event.stopPropagation();
    event.preventDefault();
  }
}
