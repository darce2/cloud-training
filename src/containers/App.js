import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../components/navbar";
import Notes from "../components/notes";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Greeting",
      content: "hi",
    },
    {
      title: "Kewl",
      content: "yo",
    },
  ]);

  useEffect(() => {
    // Make a request for a user with a given ID
    const fetchNotes = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => {
          // handle success
          console.log(response);
          const {
            data: { title, body },
          } = response;
          const newNotes = Array.from(notes);
          newNotes.push({ title, content: body });
          setNotes(newNotes);
        })
        .catch(function (error) {
          // handle error (with error if you set state)
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    };

    fetchNotes();
  }, []);

  const handleNewNote = () => {
    const newNotes = Array.from(notes);
    newNotes.push({ title: "Edit Me!", content: "Edit Me!" });
    setNotes(newNotes);
  };

  const handleDeleteNote = (index) => {
    const newNotes = Array.from(notes);
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const handleContentChange = (event, index) => {
    const {
      target: { value },
    } = event;
    const newNotes = notes.slice();
    const newNote = newNotes[index];

    newNotes.splice(index, 1, { ...newNote, content: value });

    setNotes(newNotes);
  };

  const handleTitleChange = (event, index) => {
    const {
      target: { value },
    } = event;
    const newNotes = notes.slice();
    const newNote = newNotes[index];

    newNotes.splice(index, 1, { ...newNote, title: value });

    setNotes(newNotes);
  };

  const count = notes.length;

  return (
    <div className="app__container">
      <Header count={count} />
      <div className="new-note__container">
        <div className="links__container">
          <Link to="/page">NewPage</Link>
        </div>
        <button className="btn__add-note" onClick={handleNewNote}>
          Add Note
        </button>
      </div>
      <Notes
        notes={notes}
        handleContentChange={handleContentChange}
        handleTitleChange={handleTitleChange}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
}

export default App;
