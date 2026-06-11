const bible = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4,
  "1 Samuel": 31, "2 Samuel": 24,
  "1 Kings": 22, "2 Kings": 25,
  "1 Chronicles": 29, "2 Chronicles": 36,
  Ezra: 10, Nehemiah: 13, Esther: 10,
  Job: 42, Psalms: 150, Proverbs: 31,
  Ecclesiastes: 12, "Song of Solomon": 8,
  Isaiah: 66, Jeremiah: 52, Lamentations: 5,
  Ezekiel: 48, Daniel: 12,
  Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1,
  Jonah: 4, Micah: 7, Nahum: 3,
  Habakkuk: 3, Zephaniah: 3, Haggai: 2,
  Zechariah: 14, Malachi: 4,

  Matthew: 28, Mark: 16, Luke: 24, John: 21,
  Acts: 28, Romans: 16,
  "1 Corinthians": 16, "2 Corinthians": 13,
  Galatians: 6, Ephesians: 6,
  Philippians: 4, Colossians: 4,
  "1 Thessalonians": 5, "2 Thessalonians": 3,
  "1 Timothy": 6, "2 Timothy": 4,
  Titus: 3, Philemon: 1,
  Hebrews: 13, James: 5,
  "1 Peter": 5, "2 Peter": 3,
  "1 John": 5, "2 John": 1, "3 John": 1,
  Jude: 1, Revelation: 22
};

let progress = JSON.parse(localStorage.getItem("progress")) || {};
let openBook = null;

let currentBook = localStorage.getItem("currentBook") || "Genesis";
let currentChapter = parseInt(localStorage.getItem("currentChapter") || "1");

function save() {
  localStorage.setItem("progress", JSON.stringify(progress));
}

function toggleBook(book) {
  openBook = (openBook === book) ? null : book;
  render();
}

function toggleChapter(book, chapter) {
  const key = `${book}-${chapter}`;
  progress[key] = !progress[key];
  save();

  currentBook = book;
  currentChapter = chapter;

  localStorage.setItem("currentBook", currentBook);
  localStorage.setItem("currentChapter", currentChapter);

  render();
}

function goToContinue() {
  const el = document.getElementById(`${currentBook}-${currentChapter}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.parentElement.style.background = "#fff3a0";
  } else {
    alert(`${currentBook} ${currentChapter}`);
  }
}

function render() {
  const container = document.getElementById("books");
  container.innerHTML = "";

  document.getElementById("stats").innerHTML =
    `📖 Last: ${currentBook} ${currentChapter}`;

  for (let book in bible) {
    const total = bible[book];

    let done = 0;
    for (let i = 1; i <= total; i++) {
      if (progress[`${book}-${i}`]) done++;
    }

    const isOpen = openBook === book;

    const div = document.createElement("div");
    div.className = "book";

    div.innerHTML = `
      <div class="book-header" onclick="toggleBook('${book}')">
        <strong>${book}</strong>
        <span>${done}/${total}</span>
      </div>

      <div class="chapters ${isOpen ? "open" : ""}">
        ${Array.from({ length: total }, (_, i) => {
          const chapter = i + 1;
          const key = `${book}-${chapter}`;
          const checked = progress[key] ? "checked" : "";

          return `
            <label id="${book}-${chapter}">
              <input type="checkbox" ${checked}
                onchange="toggleChapter('${book}', ${chapter})">
              ${chapter}
            </label>
          `;
        }).join("")}
      </div>
    `;

    container.appendChild(div);
  }
}

render();
