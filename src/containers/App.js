import React from "react";
import axios from "axios";

import Header from "../components/navbar";
import Notes from "../components/notes";
import "./App.css";


class App extends React.Component {
  state = {
    notes: [
      {
        title: "Greeting",
        content: "hi"
      },
      {
        title: "Kewl",
        content: "yo"
      }
    ]
  };

  componentDidMount() {
    // Make a request for a user with a given ID
    axios.get('https://api.myjson.com/bins/emrdr')
      .then(response => {
        // handle success
        console.log(response);
        const { data: { notes } } = response;
        this.setState({ notes });
      }).catch(function (error) {
        // handle error (with error if you set state)
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }



  handleNewNote = () => {
    const { notes } = this.state;
    const newNotes = Array.from(notes);
    newNotes.push({ title: 'Edit Me!', content: 'Edit Me!' });
    this.setState({
      notes: newNotes
    });
  }

  handleDeleteNote = index => {
    const { notes } = this.state;
    const newNotes = Array.from(notes);
    newNotes.splice(index, 1);
    this.setState(
      {
        notes: newNotes
      }
    );
  }

  handleContentChange = (event, index) => {
    const { target: { value } } = event;
    const { notes } = this.state;
    const newNotes = notes.slice();
    const newNote = newNotes[index];

    newNotes.splice(index, 1, { ...newNote, content: value });

    this.setState({
      notes: newNotes
    })
  }

  handleTitleChange = (event, index) => {
    const { target: { value } } = event;
    const { notes } = this.state;
    const newNotes = notes.slice();
    const newNote = newNotes[index];

    newNotes.splice(index, 1, { ...newNote, title: value });

    this.setState({
      notes: newNotes
    });
  }

  render() {
    const { notes } = this.state;
    const count = notes.length;

    return (
      <div className="app__container">
        <Header count={count} />
        <div className="new-note__container">
          <button className="btn__add-note" onClick={this.handleNewNote}>Add Note</button>
        </div>
        <Notes
          notes={notes}
          handleContentChange={this.handleContentChange}
          handleTitleChange={this.handleTitleChange}
          handleDeleteNote={this.handleDeleteNote} />
      </div>
    );
  }
}

export default App;
