import { Chip } from "@mui/material";
import { useNotes } from "../utils/ChordContext";
import { useChords } from "../utils/ProgressionContext";
import { Chord } from "../types/Chord";
import NoteAnalysis from "../analysis/NoteAnalysis";

interface ChordChipProps {
    chord: Chord;
}

const ChordChip: React.FC<ChordChipProps> = ({ chord }) => {
    const { removeChord } = useChords();
    return <Chip
        label={chord.name}
        onClick={() => removeChord(chord.id)}
    />
}

const Chords: React.FC = () => {
    const { chordNotes } = useNotes();
    const { progressionChords } = useChords();
    const noteAnalysis = new NoteAnalysis();

    const identifiedChord = noteAnalysis.identifyChord(chordNotes);
    console.log('identifiedChord: ', identifiedChord);
    return (
        <div>
            {identifiedChord && <Chip label={identifiedChord} variant='outlined'/>}
            <div>
                {progressionChords.map((chord, index) => <ChordChip chord={chord} key={index}/>)}
            </div>
        </div>
    );
}

export default Chords;