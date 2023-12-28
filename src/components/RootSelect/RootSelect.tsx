import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { NoteName } from '../../types/note';
import { useChords } from '../../utils/ProgressionContext';

const RootSelect: React.FC = () => {
    const { root, setRoot } = useChords();
    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newRoot: NoteName,
    ) => {
        console.log('newRoot: ', newRoot);
        setRoot(newRoot);
    };
    return (
        <div>
            <ToggleButtonGroup
                value={root}
                exclusive
                onChange={handleChange}
                aria-label="root-select"
            >
                {Object.values(NoteName).map((noteName, index) => (
                    <ToggleButton
                        key={index}
                        value={noteName}
                        aria-label={`root-select-${noteName}`}
                    >
                        {noteName}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
};

export default RootSelect;
