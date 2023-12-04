import { useState } from "react";
import "./App.css";
import useMIDI from "./hooks/useMIDI";
import { createNoteMessage } from "./utils/convertMessage";

interface CustomMIDIMessageEvent {
  data: Uint8Array;
}

function App() {
  const [midiMessages, setMidiMessages] = useState<string[]>([]);

  const handleMIDIMessage = (midiMessage: WebMidi.MIDIMessageEvent) => {
    const dataString = Array.from(midiMessage.data).join(', ');
  
    setMidiMessages(prevMessages => [...prevMessages, dataString]);
  };
  
  useMIDI(handleMIDIMessage);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Web MIDI App</h1>
        <div>
          <p>{JSON.stringify(createNoteMessage(midiMessages.slice(-1)))}</p>
          {/* {midiMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))} */}
        </div>
      </header>
    </div>
  );
}

export default App;
