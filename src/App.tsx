import React, { useState, useEffect } from "react";
import "./App.css";
import { keyboardNotes } from "./utils/keyboardNotes";
import useMIDI from "./hooks/useMIDI";

interface CustomMIDIMessageEvent {
  data: Uint8Array;
}

function App() {
  const [midiMessages, setMidiMessages] = useState<string[]>([]);

  const handleMIDIMessage = (midiMessage: WebMidi.MIDIMessageEvent) => {
    // Convert Uint8Array to string
    const dataString = Array.from(midiMessage.data).join(', ');
  
    setMidiMessages(prevMessages => [...prevMessages, dataString]);
  };
  
  useMIDI(handleMIDIMessage);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Web MIDI App</h1>
        <div>
          {midiMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
