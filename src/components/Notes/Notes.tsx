import { Chip, Paper, Typography } from "@mui/material";
import { NoteMessage } from "../../types/note";
import { allNotes } from "../../utils/allNotes";
import { useNotes } from "../../utils/ChordContext";
import { splitNoteAndOctave } from "../../utils/splitNoteAndOctave";
import './Notes.scss'

interface NoteChipProps {
    note: NoteMessage;
}

const NoteChip: React.FC<NoteChipProps> = ({ note }) => {
    const { removeNote } = useNotes();

    const splitNote = splitNoteAndOctave(allNotes[note.midiNote]);
    const chipLabel = <p>{splitNote[0]}<sub>{splitNote[1]}</sub></p>;
    return <Typography className='note' onClick={() => removeNote(note)}>{chipLabel}</Typography>
}

const Notes: React.FC = () => {
    const { chordNotes } = useNotes();
    return (
        <div className='notes'>
            <Typography>Notes</Typography>
            <div className='note-list'>
                {chordNotes.map((note, index) => {
                    return <NoteChip note={note} key={index}/>
                })}
            </div>
        </div>
    );
}

export default Notes;