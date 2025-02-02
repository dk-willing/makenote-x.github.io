const primaryBtn = document.querySelector(".save-btn");
const contentTitle = document.querySelector(".title");
const noteContent = document.querySelector(".notes");
const noteList = document.querySelector(".note-list");

let title;
let note;
let readingmode = false;

function addNote() {
  title = contentTitle.value;
  note = noteContent.value;

  if (contentTitle.value === "" || noteContent.value === "") {
    alert("Please add a note title and a note text");

    return;
  }

  if (readingmode) {
    const readingNote = noteList.querySelector(".reading-mode");

    removeFromStorage(readingNote.textContent);

    readingNote.classList.remove("reading-mode");
    readingNote.remove();
    readingmode = false;
  }

  const savedNotes = {
    title,
    note,
  };

  addNoteToStorage(savedNotes);

  addToDom(title, note);

  const intervalID = setTimeout(() => {
    alert("Note added successfully");
  }, 100);

  clearTimeout(intervalID);

  checkUI();
}

function noteClick(e) {
  e.preventDefault();

  if (e.target.classList.contains("icon")) {
    if (confirm("Are you sure you want to delete note?")) {
      e.target.parentElement.parentElement.parentElement.remove();

      removeFromStorage(
        e.target.parentElement.parentElement.parentElement.textContent
      );
    }
  }

  if (e.target.classList.contains("heading")) {
    readingmode = true;
    e.target.parentElement.parentElement.classList.add("reading-mode");
    let itemsFromStorage = getfromStorage();

    itemsFromStorage.forEach((note) => {
      if (e.target.textContent === note.title) {
        contentTitle.value = note.title;
        noteContent.value = note.note;
      }
    });
  }

  checkUI();
}

function addToDom(titleTxt, noteTxt) {
  const li = document.createElement("li");
  li.className = "note";

  const divhead = document.createElement("div");

  const span = document.createElement("span");
  span.className = "heading";

  span.appendChild(document.createTextNode(titleTxt));
  const details = createDetails(noteTxt);

  divhead.appendChild(span);

  const divBtn = createBtn("remove", "fa-solid fa-x icon");
  divBtn.className = "remove-btn-div";

  li.appendChild(divhead);
  li.appendChild(divBtn);

  noteList.appendChild(li);

  contentTitle.value = "";
  noteContent.value = "";
}

function createDetails(noteTxt) {
  const details = document.createElement("details");
  details.className = "details";

  const summary = document.createElement("summary");
  summary.appendChild(document.createTextNode(noteTxt));

  details.appendChild(summary);

  const span = document.createElement("span");
  span.className = "main";
  span.appendChild(document.createTextNode(noteTxt));

  details.appendChild(span);

  return details;
}

function createBtn(btnClass, iclasses) {
  const divBtn = document.createElement("div");
  const btn = document.createElement("button");
  btn.className = btnClass;

  const i = document.createElement("i");
  i.className = iclasses;

  btn.appendChild(i);

  divBtn.appendChild(btn);

  return divBtn;
}

// Local storage
function addNoteToStorage(note) {
  const itemsFromStorage = getfromStorage();

  itemsFromStorage.push(note);

  localStorage.setItem("note", JSON.stringify(itemsFromStorage));
}

function displayFromStorage() {
  let itemsFromStorage = getfromStorage();
  itemsFromStorage = JSON.parse(localStorage.getItem("note"));

  itemsFromStorage.forEach((note) => {
    addToDom(note.title, note.note);
  });
}

function removeFromStorage(text) {
  let itemsFromStorage = getfromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => text !== i.title);

  localStorage.setItem("note", JSON.stringify(itemsFromStorage));
}

function getfromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("note") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("note"));
  }

  return itemsFromStorage;
}

function checkUI() {
  let itemsFromStorage = getfromStorage();

  if (
    localStorage.getItem("note") === null ||
    localStorage.getItem("note") === "[]"
  ) {
    document.querySelector(".link-area").style.visibility = "hidden";
    document.querySelector(".link-area").style.opacity = 0;
  } else {
    document.querySelector(".link-area").style.visibility = "visible";
    document.querySelector(".link-area").style.opacity = 1;
  }
}

// Event Handlers
function init() {
  primaryBtn.addEventListener("click", addNote);
  noteList.addEventListener("click", noteClick);
  displayFromStorage();
  checkUI();
}

init();
