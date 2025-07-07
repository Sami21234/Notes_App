const addBtn = document.querySelector("#addBtn");    // refernces the Add note button in the Html
const main = document.querySelector("#main");        // refers to the main that holds the all the notes

addBtn.addEventListener("click", addNote);           // when the button is clicked the addNote function is called to create the new note.

function addNote() {         // Create a new note

    const note = document.createElement("div");      // Dynamically creating the note element using the DOM method
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i>
    </div>
    <textarea placeholder="Your note..."></textarea>    `;                      // textarea for notes text content



    // selecting child elements and Addevent Listeners

    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    // Add tooltips on hover
    save.title = "Save"
    trash.title = "Delete"
    const textarea = note.querySelector("textarea");

    save.addEventListener("click", saveNotes);
    textarea.addEventListener("input", saveNotes);
    trash.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });
    main.appendChild(note);   // appending the note into the main container
}

// function to add the data to the LocalStorage

function saveNotes() {
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value);
    if (data.length === 0) {            //if no notes exist, it clears the notes entry in localStorage 
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

// function to load the data from the localStorage to the window(page)

function loadNotes() {
    const loadNotes = JSON.parse(localStorage.getItem("notes"));

    if (loadNotes !== null) {
        loadNotes.forEach(noteText => {
            addNote();
            const notes = document.querySelectorAll(".note textarea");
            const lastNote = notes[notes.length - 1];
            lastNote.value = noteText
        });
    } else {
        addNote();
    }
}
loadNotes();
