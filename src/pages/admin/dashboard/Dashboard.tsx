import {  ThemeProvider } from '@mui/material/styles';
import { Brightness4, Brightness7, Home, Logout, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

import { darkTheme, lightTheme } from '../../../utils/adminThem';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { AppBar, DrawerHeader } from '../../../components/layout/NavBar/admin/AppBar';
import SideList from '../../../components/layout/SideList/admin/AdminSideList';




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
        <AppBar position="fixed" open={open}>
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
                onClick={() => navigate('/admin/signout')}
                sx={{ marginRight: 3 }}
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