import { useCallback } from 'react';
import NoteAnalysis from '../../analysis/NoteAnalysis';
import useMIDI from '../../hooks/useMIDI';
import { MessageType, NoteMessage } from '../../types/note';
import NavBar from '../../components/NavBar/NavBar';
import { allNotes } from '../../utils/allNotes';
import ChorderPiano from '../../components/ChorderPiano';
import { ChordService, CreateChordDto } from '../../utils/chordService';
import { useNotes } from '../../utils/ChordContext';
import { SideBar } from '../../components/SideBar/SideBar';
import RootSelect from '../../components/RootSelect/RootSelect';
import Notes from '../../components/Notes/Notes';
import Chords from '../../components/Chords/Chords';
import { Paper } from '@mui/material';
import './Home.scss';
import CurrentChord from '../../components/Chords/CurrentChord';

const Home: React.FC = () => {
    const { addNote, removeNote, clearNotes, isNoteInChord, chordNotes } = useNotes();
    const chordService = new ChordService();

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



    useMIDI(processMIDIMessage);
    const noteAnalysis = new NoteAnalysis();
    return (
        <div className="App">
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <div className='home'>
                    <div className='data-display'>
                        <Notes/>
                        <CurrentChord/>
                        <Chords/>
                    </div>
                    <Paper className='piano' elevation={3}>
                        <ChorderPiano />
                    </Paper>
                    <RootSelect/>
                </div>
            </div>
        </div>
    );
};

export default Home;
