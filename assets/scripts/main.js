"use strict";

const states = {
  State: class {
    constructor(template, data) {
      this.template = template;
      this.data = data;
    }
  },

  load(state) {
    const main = document.getElementsByClassName("Main")[0];
    main.innerHTML = "";
    main.appendChild(state.template(state.data));
    navigation.focus(document.getElementById("Autofocus"));
    // history.pushState(state, "");
  },
};

const templates = {
  item(data) {
    const li = document.createElement("li");
    li.className = "Item";
    li.tabIndex = -1;
    li.textContent = data.text;
    if (data.action) {
      li.dataset.action = data.action;
      li.classList.add("Item--action");
    }
    if (data.autofocus)
      li.id = "Autofocus";
    return li;
  },

  menu(data) {
    const ul = document.createElement("ul");
    data.forEach(itemData => ul.appendChild(templates.item(itemData)));
    return ul;
  },

  game(data) {
    // TODO
  },
};

const navigation = {
  focus(element) {
    element.focus();
    const overflownParent = selectors.closestOverflown(element);
    if (overflownParent) {
      const elementRect = element.getBoundingClientRect();
      const parentRect = overflownParent.getBoundingClientRect();
      if (elementRect.top < parentRect.top)
        element.scrollIntoView();
      else if (elementRect.bottom > parentRect.bottom)
        element.scrollIntoView(false);
    }
  },

  menuListener(event) {
    if (event.target.matches(".Item")) {
      switch(event.key) {
      case "ArrowUp":
        navigation.focus(selectors.loopedPreviousSibling(event.target));
        event.preventDefault();
        break;
      case "ArrowDown":
        navigation.focus(selectors.loopedNextSibling(event.target));
        event.preventDefault();
        break;
      }
    }
  },
};

const selectors = {
  loopedPreviousSibling(node) {
    if (node.previousSibling)
      return node.previousSibling;
    else
      return node.parentNode.lastChild;
  },

  loopedNextSibling(node) {
    if (node.nextSibling)
      return node.nextSibling;
    else
      return node.parentNode.firstChild;
  },

  closestOverflown(element) {
    if (element === null || element.scrollHeight > element.clientHeight)
      return element;
    else
      return selectors.closestOverflown(element.parentElement);
  },
}

states.load(
  new states.State(
    templates.menu,
    [
      {
        text: "New game",
        action: "newGame",
        autofocus: true,
      },
      {
        text: "Continue",
        action: "newGame",
      },
      {
        text: "High scores",
        action: "highScores",
      },
    ],
  )
);

document.addEventListener("keydown", navigation.keyboardListener);
