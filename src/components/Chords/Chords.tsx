import { Chip, Typography } from '@mui/material';
import { useChords } from '../../utils/ProgressionContext';
import { Chord } from '../../types/Chord';
import ProgressionAnalysis from '../../analysis/ProgressionAnalysis';
import './Chords.scss';
import ChordChip from './ChordChip';

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
                        <ChordChip
                            chord={chord}
                            addable={false}
                            removeable={true}
                            clearable={false}
                        />
                        <Typography>{romanNumeralFormat[index]}</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chords;
