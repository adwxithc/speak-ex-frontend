import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import  { Dispatch, SetStateAction, useState} from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {list} from './Navigate'
import { IconButton, Theme,  Tooltip,  styled } from '@mui/material';
import { CSSObject } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { DrawerHeader} from '../../NavBar/admin/AppBar'




const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

  const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
    minHeight: 48,
    justifyContent: 'initial',
    px: 2.5,
    borderRadius: 3,
    backgroundColor: selected ? theme.palette.primary.main : 'transparent',
    
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  }));

function Sidelist({open,setOpen}:{open:boolean,setOpen:Dispatch<SetStateAction<boolean>>}) {
  
const navigate = useNavigate()
const [selectedLink, setSelectedLink] = useState(window.location.pathname);

  
  return (
    <>
        <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={()=>setOpen(false)}>
            {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block',paddingX:open ?'20px':'1px' }}>
              <StyledListItemButton
               selected={selectedLink === '/admin/'+item.link}
                
                onClick={()=>{navigate(item.link);setSelectedLink('/admin/'+item.link)}}
              >
                <Tooltip title={item.title}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                   color:'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                </Tooltip>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
    
      </>
  )
}

export default Sidelist
