import { useState } from "react";
import "./App.css";
import useMIDI from "./hooks/useMIDI";
import { createNoteMessage } from "./utils/convertMessage";
import { NoteMessage } from "./types/note";

interface CustomMIDIMessageEvent {
  data: Uint8Array;
}

function App() {
  const [note, setNote] = useState<NoteMessage>();

  const handleMIDIMessage = (midiMessage: WebMidi.MIDIMessageEvent) => {
    const [messageType, midiNumber, velocity] = Array.from(midiMessage.data);
    setNote({
      midiNote: midiNumber,
      type: messageType,
      velocity
    });
  };

  useMIDI(handleMIDIMessage);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Web MIDI App</h1>
        <div>
          <p>{JSON.stringify(note)}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
