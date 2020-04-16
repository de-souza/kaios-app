"use strict";

document.getElementById("Autofocus").focus();
document.addEventListener("keydown", menuNavigationListener);

function menuNavigationListener(e) {
  if (e.target.matches(".Menu-item")) {
    switch(e.key) {
    case "ArrowUp":
      return menuUp(e);
    case "ArrowDown":
      return menuDown(e);
    }
  }
}

function menuUp(e) {
  let newMenuItem = previousListItem(e.target.parentElement).firstElementChild;
  newMenuItem.focus();
  scrollToMenuItem(newMenuItem);
  e.preventDefault();
}

function menuDown(e) {
  let newMenuItem = nextListItem(e.target.parentElement).firstElementChild;
  newMenuItem.focus();
  scrollToMenuItem(newMenuItem);
  e.preventDefault();
}

function previousListItem(current) {
  if (current.previousElementSibling)
    return current.previousElementSibling;
  else
    return current.parentElement.lastElementChild;
}

function nextListItem(current) {
  if (current.nextElementSibling)
    return current.nextElementSibling;
  else
    return current.parentElement.firstElementChild;
}

function scrollToMenuItem(newMenuItem) {
  const menuItemRect = newMenuItem.getBoundingClientRect();
  const menuRect = newMenuItem.closest(".Menu").getBoundingClientRect();
  if (menuItemRect.top < menuRect.top)
    newMenuItem.scrollIntoView(true);
  else if (menuItemRect.bottom > menuRect.bottom)
    newMenuItem.scrollIntoView(false);
}
