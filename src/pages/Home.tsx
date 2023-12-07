import { useCallback, useReducer, useRef } from "react";
import NoteAnalysis from "../analysis/chord";
import useMIDI from "../hooks/useMIDI";
import { ActionTypes } from "../types/ActionTypes.type";
import { MessageType, NoteMessage } from "../types/note";
import { midiReducer } from "../midi/midiReducer";
import NavBar from "../components/NavBar/NavBar";
import { allNotes } from "../utils/allNotes";
import ChorderPiano from "../components/ChorderPiano";
import { ChordService, CreateChordDto } from "../utils/chordService";

const Home: React.FC = () => {
  const [midiState, dispatch] = useReducer(midiReducer, {
    messages: [],
    chordNotes: [],
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 0;

  const chordService = new ChordService();

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
      };

      const removeNoteFromChord = () => {
        dispatch({
          type: ActionTypes.REMOVE_NOTE,
          payload: newNote,
        });
      };

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

  const handleSaveChord = () => {
    const payload: CreateChordDto = {
        name: noteAnalysis.identifyChord(midiState.chordNotes),
        description: '',
        notes: midiState.chordNotes.map((note: NoteMessage) => allNotes[note.midiNote]).join(':')
    }
    return chordService.saveChord(payload);
  }

  useMIDI(handleMIDIMessage);
  const noteAnalysis = new NoteAnalysis();
  const notesArray: string[] = midiState.chordNotes.map(
    (noteMessage: NoteMessage) => allNotes[noteMessage.midiNote]
  );
  return (
    <div className="App">
      <NavBar />
      <div>
        <ChorderPiano/>
        <p>{JSON.stringify(notesArray)}</p>
        <p>{noteAnalysis.identifyChord(midiState.chordNotes)}</p>
        <button onClick={clearChordNotes}>Clear</button>
        <button onClick={handleSaveChord}>Save Chord</button>
      </div>
    </div>
  );
};

export default Home;
