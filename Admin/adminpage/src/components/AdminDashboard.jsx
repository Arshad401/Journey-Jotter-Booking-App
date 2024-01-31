import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AdjustIcon from '@mui/icons-material/Adjust';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VillaIcon from '@mui/icons-material/Villa';
import KingBedIcon from '@mui/icons-material/KingBed';
import Chart from './Chart';




 





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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { dispatch} = useContext(AuthContext)

  const handleDashButtonClick = () => {
    navigate('/dash');
  };
   
  const handleUsersButtonClick = () => {
    navigate('/users');
  };
  const handleshowroomsClick = () => {
    navigate('/showrooms');
  };
  const handlehotelbuttonClick = () => {
    navigate ('/hotels')
  }
  const handlehotelshowbuttonClick = () => {
    navigate ('/Showhotels')
  }
  const handleAddCouponbuttonClick = () => {
    navigate ('/addcoupon')
  }
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate('/login')
    toast.success("logout successfully")
    

  }

  return (
    
      <><ThemeProvider theme={defaultTheme}>
      
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" sx={{ backgroundColor: "#003580" }} open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              JourneyJotter Admin Dashboard
            </Typography>
            <IconButton color="inherit">
            
            </IconButton>
            <Tooltip title="Logout" arrow>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListSubheader component="div" inset>
            </ListSubheader>
             <ListItemButton onClick={handleDashButtonClick}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
               <ListItemText primary="Dashboard" /> 
               </ListItemButton> 
            <ListItemButton onClick={handleUsersButtonClick}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton >
            <ListItemButton  onClick={handlehotelbuttonClick}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="CreateHotels" />
            </ListItemButton>
            <ListItemButton  onClick={handlehotelshowbuttonClick}>
              <ListItemIcon>
                <VillaIcon />
              </ListItemIcon>
              <ListItemText primary="Hotels" />
            </ListItemButton>
            <ListItemButton  onClick={handleshowroomsClick}>
              <ListItemIcon>
                <KingBedIcon />
              </ListItemIcon>
              <ListItemText primary="Show Rooms" />
            </ListItemButton>
            <ListItemButton  onClick={handleAddCouponbuttonClick}>
              <ListItemIcon>
                <ConfirmationNumberIcon/>
              </ListItemIcon>
              <ListItemText primary="Add Coupon" />
            </ListItemButton>
          </List>
          <Divider sx={{ my: 1 }} />
          <ListSubheader component="div" inset>
            
          </ListSubheader>
          
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider></>
   
    
  );
}

