let openBook = null;

function toggleBook(book) {
  openBook = openBook === book ? null : book;
  render();
}

function toggle(book, chapter) {
  const key = `${book}-${chapter}`;
  progress[key] = !progress[key];
  save();
  render();
}

function render() {
  const container = document.getElementById("books");
  container.innerHTML = "";

  for (let book in bible) {
    const total = bible[book];

    let done = 0;
    for (let i = 1; i <= total; i++) {
      if (progress[`${book}-${i}`]) done++;
    }

    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    const isOpen = openBook === book;

    bookDiv.innerHTML = `
      <div class="book-header" onclick="toggleBook('${book}')">
        <h2>${book} (${done}/${total})</h2>
        <span>${isOpen ? "▲" : "▼"}</span>
      </div>

      <div class="chapters ${isOpen ? "open" : "closed"}">
        ${Array.from({ length: total }, (_, i) => {
          const chapter = i + 1;
          const key = `${book}-${chapter}`;
          const checked = progress[key] ? "checked" : "";

          return `
            <label>
              <input type="checkbox" ${checked}
                onchange="toggle('${book}', ${chapter})">
              ${chapter}
            </label>
          `;
        }).join("")}
      </div>
    `;

    container.appendChild(bookDiv);
  }
}

render();
