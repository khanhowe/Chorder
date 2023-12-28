import { Button, ButtonGroup, Paper } from "@mui/material";
import './SideBar.scss';

interface SideBarButtonProps {
    text: string
}


const SideBarButton: React.FC<SideBarButtonProps> = ({ text }) => {
    return (
        <Button variant='outlined' className="sidebar-button">{text}</Button>
    )
}

export const SideBar: React.FC = () => {
    return (
        <Paper className="sidebar" elevation={5}>
            <SideBarButton text="Home"/>
            <ButtonGroup orientation='vertical' className="sidebar-savables-section">
                <SideBarButton text="Chords"/>
                <SideBarButton text="Progressions"/>
                <SideBarButton text="Songs"/>
            </ButtonGroup>
        </Paper>
    );
}