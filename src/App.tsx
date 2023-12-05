import { useCallback, useReducer, useRef } from "react";
import "./App.css";
import useMIDI from "./hooks/useMIDI";
import { MessageType } from "./types/note";
import NoteAnalysis from "./analysis/chord";
import { midiReducer } from "./midi/midiReducer";
import { ActionTypes } from "./types/ActionTypes.type";

function App() {
  const [midiState, dispatch] = useReducer(midiReducer, {
    messages: [],
    chordNotes: [],
  });

  // useRef to maintain the debounce timer across renders
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 100;

  const processMIDIMessage = useCallback(
    (midiMessage: WebMidi.MIDIMessageEvent) => {
      const [messageType, midiNumber, velocity] = Array.from(midiMessage.data);

      if (messageType === MessageType.PressOn) {
        dispatch({
          type: ActionTypes.ADD_NOTE,
          payload: { midiNote: midiNumber, velocity },
        });
      }
      // Add other conditions as needed
    },
    [dispatch]
  );

  const handleMIDIMessage = useCallback(
    (midiMessage: WebMidi.MIDIMessageEvent) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(
        () => processMIDIMessage(midiMessage),
        debounceDelay
      );
    },
    [processMIDIMessage]
  );
  const clearChordNotes = (): void => {
    dispatch({ type: ActionTypes.CLEAR_NOTES });
  };

  useMIDI(handleMIDIMessage);
  const noteAnalysis = new NoteAnalysis();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web MIDI App</h1>
        <div>
          <p>{JSON.stringify(midiState)}</p>
          <button onClick={clearChordNotes}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
