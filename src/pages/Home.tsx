import { useCallback } from 'react';
import NoteAnalysis from '../analysis/NoteAnalysis';
import useMIDI from '../hooks/useMIDI';
import { MessageType, NoteMessage } from '../types/note';
import NavBar from '../components/NavBar/NavBar';
import { allNotes } from '../utils/allNotes';
import ChorderPiano from '../components/ChorderPiano';
import { ChordService, CreateChordDto } from '../utils/chordService';
import { useNotes } from '../utils/ChordContext';
import { useChords } from '../utils/ProgressionContext';
import { Chord } from '../types/Chord';
import { v4 as uuidv4 } from 'uuid';
import { SideBar } from '../components/SideBar/SideBar';
import RootSelect from '../components/RootSelect/RootSelect';
import { Progression } from 'tonal';
import ProgressionAnalysis from '../analysis/ProgressionAnalysis';

const Home: React.FC = () => {
    const { addNote, removeNote, clearNotes, isNoteInChord, chordNotes } = useNotes();
    const { addChord, removeChord, clearChords, root, progressionChords } = useChords();
    const chordService = new ChordService();
    const progressionAnalysis = new ProgressionAnalysis();

    const processMIDIMessage = useCallback(
        (midiMessage: WebMidi.MIDIMessageEvent) => {
            const [messageType, midiNumber, velocity] = Array.from(
                midiMessage.data,
            );

            const newNote: NoteMessage = {
                midiNote: midiNumber,
                type: messageType,
                velocity,
            };

            if (newNote.type === MessageType.PressOn) {
                if (isNoteInChord(newNote)) {
                    removeNote(newNote);
                } else {
                    addNote(newNote)
                }
            }
        },
        [addNote, removeNote, isNoteInChord],
    );

    const clearChordNotes = useCallback(() => {
        clearNotes();
    }, [clearNotes]);

    const handleSaveChord = () => {
        const payload: CreateChordDto = {
            name: noteAnalysis.identifyChord(chordNotes),
            description: '',
            notes: chordNotes
                .map((note: NoteMessage) => allNotes[note.midiNote])
                .join(':'),
        };
        return chordService.saveChord(payload);
    };

    const addChordToProgression = useCallback(() => {
        addChord({
            id: uuidv4(),
            name: noteAnalysis.identifyChord(chordNotes) || '',
            description: '',
            notes: chordNotes
        })
    }, [addChord, chordNotes])

    useMIDI(processMIDIMessage);
    const noteAnalysis = new NoteAnalysis();
    const notesArray: string[] = chordNotes.map(
        (noteMessage: NoteMessage) => allNotes[noteMessage.midiNote],
    );
    return (
        <div className="App">
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <SideBar/>
                <div>
                    <ChorderPiano />
                    <RootSelect/>
                    <p>{JSON.stringify(progressionChords.map((chord: Chord) => chord.name))}</p>
                    <p>{JSON.stringify(progressionAnalysis.identifyProgression(root, progressionChords))}</p>
                    <p>{JSON.stringify(notesArray)}</p>
                    <p>{noteAnalysis.identifyChord(chordNotes)}</p>
                    <button onClick={clearChordNotes}>Clear</button>
                    <button onClick={handleSaveChord}>Save Chord</button>
                    <button onClick={addChordToProgression}>Add Chord To Progression</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
