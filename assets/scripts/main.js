"use strict";

document.getElementById("Autofocus").focus();
document.addEventListener("keydown", menuNavigationListener);

function menuNavigationListener(e) {
  if (e.target.matches(".MenuItem")) {
    switch(e.key) {
    case "ArrowUp":
      menuUp(e);
      break;
    case "ArrowDown":
      menuDown(e);
      break;
    }
  }
}

function menuUp(e) {
  let newItem = previousListItem(e.target.parentElement).firstElementChild;
  newItem.scrollIntoView({block: "nearest"});
  newItem.focus();
  e.preventDefault();
}

function menuDown(e) {
  let newItem = nextListItem(e.target.parentElement).firstElementChild;
  newItem.scrollIntoView({block: "nearest"});
  newItem.focus();
  e.preventDefault();
}

function previousListItem(li) {
  if (li.previousElementSibling)
    return li.previousElementSibling;
  else
    return li.parentElement.lastElementChild;
}

function nextListItem(li) {
  if (li.nextElementSibling)
    return li.nextElementSibling;
  else
    return li.parentElement.firstElementChild;
}
