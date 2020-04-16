"use strict";

document.getElementById("Autofocus").focus();
document.addEventListener("keydown", menuNavigationListener);

function menuNavigationListener(e) {
  if (e.target.matches(".Menu-item")) {
    switch(e.key) {
    case "ArrowUp":
      focusMenuItem(previousMenuItem(e.target));
      e.preventDefault();
      break;
    case "ArrowDown":
      focusMenuItem(nextMenuItem(e.target));
      e.preventDefault();
      break;
    }
  }
}

function focusMenuItem(newMenuItem) {
  newMenuItem.focus();
  scrollToMenuItem(newMenuItem);
}

function previousMenuItem(currentMenuItem) {
  return previousListItem(currentMenuItem.parentElement).firstElementChild;
}

function nextMenuItem(currentMenuItem) {
  return nextListItem(currentMenuItem.parentElement).firstElementChild;
}

function previousListItem(currentListItem) {
  if (currentListItem.previousElementSibling)
    return currentListItem.previousElementSibling;
  else
    return currentListItem.parentElement.lastElementChild;
}

function nextListItem(currentListItem) {
  if (currentListItem.nextElementSibling)
    return currentListItem.nextElementSibling;
  else
    return currentListItem.parentElement.firstElementChild;
}

function scrollToMenuItem(menuItem) {
  const menuItemRect = menuItem.getBoundingClientRect();
  const menuRect = menuItem.closest(".Menu").getBoundingClientRect();
  if (menuItemRect.top < menuRect.top)
    menuItem.scrollIntoView(true);
  else if (menuItemRect.bottom > menuRect.bottom)
    menuItem.scrollIntoView(false);
}
