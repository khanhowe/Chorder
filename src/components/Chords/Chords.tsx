import { Chip, Typography } from '@mui/material';
import { useChords } from '../../utils/ProgressionContext';
import { Chord } from '../../types/Chord';
import ProgressionAnalysis from '../../analysis/ProgressionAnalysis';
import './Chords.scss';

interface ChordChipProps {
    chord: Chord;
}

const ChordChip: React.FC<ChordChipProps> = ({ chord }) => {
    const { removeChord } = useChords();
    return <Chip label={chord.name} onClick={() => removeChord(chord.id)} />;
};

const Chords: React.FC = () => {
    const { progressionChords, root } = useChords();
    const progressionAnalysis = new ProgressionAnalysis();
    const romanNumeralFormat = progressionAnalysis.identifyProgression(root, progressionChords);
    return (
        <div className='progression'>
            <Typography>Progression</Typography>
            <div className='chords'>
                {progressionChords.map((chord, index) => (
                    <div className='chord-container' key={index}>
                        <Typography>{chord.name}</Typography>
                        <Typography>{romanNumeralFormat[index]}</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chords;
