"use strict";

document.getElementById("Autofocus").focus();
document.addEventListener("keydown", menuNavigationListener);

function menuNavigationListener(e) {
  if (e.target.matches(".Menu-item")) {
    switch(e.key) {
    case "ArrowUp":
      menuMove(e.target, previousMenuItem);
      e.preventDefault();
      break;
    case "ArrowDown":
      menuMove(e.target, nextMenuItem);
      e.preventDefault();
      break;
    }
  }
}

function menuMove(currentMenuItem, newMenuItemFunc) {
  const newMenuItem = newMenuItemFunc(currentMenuItem);
  newMenuItem.focus();
  scrollToMenuItem(newMenuItem);
}

function previousMenuItem(currentMenuItem) {
  return previousItemInList(currentMenuItem.parentElement).firstElementChild;
}

function nextMenuItem(currentMenuItem) {
  return nextItemInList(currentMenuItem.parentElement).firstElementChild;
}

function previousItemInList(current) {
  if (current.previousElementSibling)
    return current.previousElementSibling;
  else
    return current.parentElement.lastElementChild;
}

function nextItemInList(current) {
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
