"use strict";

document.getElementById("Autofocus").focus();
document.addEventListener("keydown", listNavigation);

function listNavigation(e) {
  if (e.target.matches("li")) {
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
      e.preventDefault();
      nextFocusedElment(e).focus();
    }
  }
}

function nextFocusedElment(e) {
  switch(e.key) {
  case "ArrowUp":
    if (e.target.previousElementSibling)
      return e.target.previousElementSibling;
    else
      return e.target.parentElement.lastElementChild;
  case "ArrowDown":
    if (e.target.nextElementSibling)
      return e.target.nextElementSibling;
    else
      return e.target.parentElement.firstElementChild;
  }
}
