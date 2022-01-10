const submitBtn = document.querySelector('#submit-btn');
const clearBtn = document.querySelector('#clear-btn');
const noteInput = document.querySelector('#note-text');
const noteTitle = document.querySelector('#note-title');

let notes = [];

const createNote = (title, text) => {
	const noteDiv = document.createElement('div');
	noteDiv.classList.add('note');
	noteDiv.innerHTML = `
		<div class="note-content">
			<h3 class="note-title">${title}</h3>
			<p class="note-text">${text}</p>
		</div>
		<div class="note-delete-icon">
			<svg class="delete-icon" onclick="deleteNote(event)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg>
		</div>
		`;
	return noteDiv;
};

const validateTextLength = text => {
	return text.length > 0 && text.length < 1000;
};

const validateTitle = title => {
	let valid = true;
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].title === title) {
			valid = false;
		}
	}
	return valid;
};

submitBtn.addEventListener('click', event => {
	event.preventDefault();
	const text = noteInput.value;
	const title = noteTitle.value;
	if (validateTitle(title)) {
		if (validateTextLength(title)) {
			noteInput.classList.remove('error');
			const note = createNote(title, text);
			notes.push({ title: title, text: text });
			renderNotes();
			noteInput.value = '';
			noteTitle.value = '';
			saveNotes();
		} else {
			noteInput.classList.add('error');
		}
	} else {
		noteTitle.classList.add('error');
	}
});

const renderNotes = () => {
	const noteContainer = document.querySelector('#notes');
	noteContainer.innerHTML = '';
	notes.forEach(note => {
		const n = createNote(note.title, note.text);
		noteContainer.appendChild(n);
	});
};

const deleteNote = event => {
	// TODO: Fix bug where last element sometimes doesn't get deleted
	const note = event.target.parentElement.parentElement;
	let index = -1;
	notes.forEach((n, i) => {
		if (n.title === note.querySelector('.note-title').innerText && n.text === note.querySelector('.note-text').innerText) {
			index = i;
		}
	});
	if (index != -1) {
		notes.splice(index, 1);
		renderNotes();
		saveNotes();
	}
};

// Save notes to local storage
const saveNotes = () => {
	localStorage.setItem('notes', JSON.stringify(notes));
};

// Load notes from local storage
const loadNotes = () => {
	if (localStorage.getItem('notes')) {
		notes = JSON.parse(localStorage.getItem('notes'));
		renderNotes();
	}
};

loadNotes();
