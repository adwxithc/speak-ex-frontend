import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Brightness4, Brightness7, Home, Logout, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import SideList from './Sidelist';



const lightTheme = createTheme({
  palette: {
    mode: 'light', // Set mode to 'light'
    primary: {
      main: '#2937B1', // Your light mode primary color
    },
    secondary: {
      main: '#ffc107', // Your light mode secondary color
    },
    background: {
      default: '#fff', // Your light mode background color
    },
    text: {
      primary: '#000000ac', // Your light mode text color
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set mode to 'dark'
    primary: {
      main: '#007bff', // Your dark mode primary color (can be different from light)
    },
    secondary: {
      main: '#ffc107', // Your dark mode secondary color (can be different from light)
    },
    background: {
      default: '#000', // Your dark mode background color
    },
    text: {
      primary: '#fff', // Your dark mode text color
    },
  },
});


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed"  open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/')}>
                <Home />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Tooltip title='logout'>
              <IconButton 
              onClick={()=>navigate('/admin/signout')}
              sx={{marginRight:3}}
              >
              <Logout
              
               />
               </IconButton>
            </Tooltip>
            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <SideList {...{ open, setOpen }} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       
        <Outlet />

      </Box>
      </Box>
    </ThemeProvider>
  );
}