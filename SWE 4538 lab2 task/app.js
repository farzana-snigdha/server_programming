const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Read notes from the file
function readNotesFromFile() {
    try {
        const data = fs.readFileSync('notes.txt', 'utf8');
        return data.split('\n').filter(note => note.trim() !== '');
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Render the home page with notes
app.get('/', (req, res) => {
    const notes = readNotesFromFile();
    res.render('index', { notes });
});

// Add a new note
app.post('/add', (req, res) => {
    const newNote = req.body.note.trim();

    if (newNote) {
        fs.appendFileSync('notes.txt', `${newNote}\n`);
    }

    res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  const index = req.params.index;
  const notes = readNotesFromFile();

  if (index >= 0 && index < notes.length) {
      // Remove the note at the specified index
      notes.splice(index, 1);

      // Save the updated notes to the file
      fs.writeFileSync('notes.txt', notes.join('\n'));

      // Send a success response
      res.status(200).send('Note deleted successfully');
  } else {
      // Handle invalid index (e.g., index out of range)
      res.status(400).send('Invalid index');
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
