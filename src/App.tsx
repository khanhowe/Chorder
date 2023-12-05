import { useCallback, useReducer, useRef } from "react";
import "./App.css";
import useMIDI from "./hooks/useMIDI";
import { MessageType, NoteMessage } from "./types/note";
import NoteAnalysis from "./analysis/chord";
import { midiReducer } from "./midi/midiReducer";
import { ActionTypes } from "./types/ActionTypes.type";

function App() {
  const [midiState, dispatch] = useReducer(midiReducer, {
    messages: [],
    chordNotes: [],
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 0;

  const processMIDIMessage = useCallback(
    (midiMessage: WebMidi.MIDIMessageEvent) => {
      const [messageType, midiNumber, velocity] = Array.from(midiMessage.data);
      
      const newNote: NoteMessage = {
        midiNote: midiNumber,
        type: messageType,
        velocity,
      };

      const isNoteInChordNotes = (noteToCheck: NoteMessage): boolean => {
        return midiState.chordNotes.some(
          (note: NoteMessage) => note.midiNote === noteToCheck.midiNote
        );
      };

      const addNoteToChord = () => {
        dispatch({
          type: ActionTypes.ADD_NOTE,
          payload: newNote,
        });
      }
      
      const removeNoteFromChord = () => {
        dispatch({
          type: ActionTypes.REMOVE_NOTE,
          payload: newNote,
        });
      }

      if (newNote.type === MessageType.PressOn) {
        const noteAlreadyIncluded = isNoteInChordNotes(newNote);
        if (noteAlreadyIncluded) {
          removeNoteFromChord();
        } else {
          addNoteToChord();
        }
      }
    },
    [dispatch, midiState]
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

  const clearChordNotes = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_NOTES });
  }, [dispatch]);

  useMIDI(handleMIDIMessage);
  const noteAnalysis = new NoteAnalysis();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web MIDI App</h1>
        <div>
          <p>{JSON.stringify(midiState.chordNotes)}</p>
          <p>{noteAnalysis.identifyChord(midiState.chordNotes)}</p>
          <button onClick={clearChordNotes}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
