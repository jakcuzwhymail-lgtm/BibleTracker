const bible = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27
  // you can expand later or load full dataset
};

let progress = JSON.parse(localStorage.getItem("bibleProgress")) || {};

function save() {
  localStorage.setItem("bibleProgress", JSON.stringify(progress));
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

    bookDiv.innerHTML = `
      <h2>${book} (${done}/${total})</h2>
      <div class="chapters">
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
