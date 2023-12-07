import { Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";
import { deepPurple } from "@mui/material/colors";
import './Navbar.scss';
import { useState } from "react";
import { Person } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavBar: React.FC = () => {
    const { user } = useAuth();
    const usernameLetter = user?.username.charAt(0).toUpperCase();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event?.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <div className="navbar">
            <Button
                id='user-menu-button'
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar sx={{bgcolor: deepPurple[500]}}>{usernameLetter}</Avatar>
            </Button>
            <Menu
                id='user-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'user-menu-button'
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Settings
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default NavBar;