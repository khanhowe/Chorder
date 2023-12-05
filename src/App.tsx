import { useState } from "react";
import "./App.css";
import useMIDI from "./hooks/useMIDI";
import { MessageType, NoteMessage } from "./types/note";
import { allNotes } from "./utils/allNotes";
import NoteAnalysis from "./analysis/chord";

interface CustomMIDIMessageEvent {
  data: Uint8Array;
}

function App() {
  const [note, setNote] = useState<NoteMessage>();
  const [messages, setMessages] = useState<NoteMessage[]>([]);
  const [chordNotes, setChordNotes] = useState<NoteMessage[]>([]);

  const handleMIDIMessage = (midiMessage: WebMidi.MIDIMessageEvent) => {
    const [messageType, midiNumber, velocity] = Array.from(midiMessage.data);

    const newNote: NoteMessage = {
      midiNote: midiNumber,
      type: messageType,
      velocity,
    };

    setMessages((prevMessages) => [...prevMessages, newNote]);
    setNote(newNote);

    if (newNote.type === MessageType.PressOn) {
      setChordNotes((prevNotes) => {
        const noteExists = prevNotes.some(
          (note) => note.midiNote === newNote.midiNote
        );
        if (noteExists) {
          return prevNotes.filter((note) => note.midiNote !== newNote.midiNote);
        } else {
          return [...prevNotes, newNote];
        }
      });
    }
  };

  const clearChordNotes = (): void => {
    setChordNotes([]);
  }

  useMIDI(handleMIDIMessage);
  const noteAnalysis = new NoteAnalysis();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web MIDI App</h1>
        <div>
          <p>{JSON.stringify(note)}</p>
          <p>{JSON.stringify(chordNotes.map(chordNote => allNotes[chordNote.midiNote]))}</p>
          <p>Chord: {noteAnalysis.identifyChord(chordNotes)}</p>
          <button onClick={clearChordNotes}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
