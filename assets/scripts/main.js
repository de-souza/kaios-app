"use strict";

const states = {
  init(state) {
    states.update(state);
    states.display(state);
    window.onpopstate = event => states.display(event.state);
  },

  update(state) {
    history.replaceState(state, "");
  },

  push(state) {
    history.pushState(state, "");
    states.display(state);
  },

  display(state) {
    const root = document.getElementsByClassName("Main")[0];
    const newRoot = root.cloneNode();
    newRoot.appendChild(templates[state.type](state.data));
    root.replaceWith(newRoot);
    handlers[state.type]();
  },

  highScores: {
    type: "menu",
    data: [
      { text: "Best score" },
      { text: "Average score" },
      { text: "Worst score" },
    ],
  },
};

const templates = {
  menu(data) {
    const ul = document.createElement("ul");
    data.forEach(data => ul.appendChild(templates.item(data)));
    const focusIdx = data.findIndex(data => data.autofocus);
    const focused = (focusIdx === -1) ? ul.firstChild : ul.children[focusIdx];
    focused.id = "Autofocus";
    return ul;
  },

  item(data) {
    const li = document.createElement("li");
    li.className = "Item";
    li.tabIndex = -1;
    li.textContent = data.text;
    if (data.state) {
      li.dataset.state = data.state;
      li.classList.add("Item--link");
    }
    return li;
  },

  game(data) {
    // TODO
  },
};

const handlers = {
  menu() {
    navigation.focus(document.getElementById("Autofocus"));
    const updateStateFocus = () => {
      const state = history.state;
      state.data.map(data => delete data.autofocus);
      const focused = document.activeElement;
      const focusIdx = [...focused.parentNode.children].indexOf(focused);
      if (focusIdx !== -1)
        state.data[focusIdx].autofocus = true;
      states.update(state);
    };
    const root = document.getElementsByClassName("Main")[0];
    root.onkeydown = event => {
      switch(event.key) {
      case "ArrowUp":
        navigation.focusPrevious(event.target);
        updateStateFocus();
        return false;
      case "ArrowDown":
        navigation.focusNext(event.target);
        updateStateFocus();
        return false;
      case " ":
        navigation.activate(event.target);
        return false;
      case "Escape":
        history.back();
        return false;
      }
    };
    root.onclick = event => navigation.activate(event.target);
  },

  game(data) {
    // TODO
  }
};

const navigation = {
  focus(element) {
    element.focus();
    const overflownParent = selectors.closestOverflown(element);
    if (overflownParent)
      navigation.scrollIfHidden(element, overflownParent);
  },

  focusPrevious(element) {
    navigation.focus(selectors.loopedPreviousSibling(element));
  },

  focusNext(element) {
    navigation.focus(selectors.loopedNextSibling(element));
  },

  activate(element) {
    if (element.dataset.state)
      states.push(states[element.dataset.state]);
  },

  scrollIfHidden(element, parent) {
    const elementRect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    if (elementRect.top < parentRect.top)
      element.scrollIntoView();
    else if (elementRect.bottom > parentRect.bottom)
      element.scrollIntoView(false);
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
};

states.init({
  type: "menu",
  data: [
    {
      text: "New game",
      // state: "newGame",
    },
    {
      text: "Continue",
      // state: "newGame",
    },
    {
      text: "High scores",
      state: "highScores",
    },
  ],
});
