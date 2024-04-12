import { styled } from '@mui/material';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'; // Import the AppBarProps type

const drawerWidth = 240;

interface CustomAppBarProps extends AppBarProps {
    open?: boolean; // Define the open prop in the interface
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<CustomAppBarProps>(({ theme, open }) => ({
    // Use CustomAppBarProps
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
