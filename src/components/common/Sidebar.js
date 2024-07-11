import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, colors } from '@mui/material';
import { images } from '../../assets';
import Animate from './Animate';

const menus = [
  {
    title: 'Overview',
    icon: <DashboardCustomizeOutlinedIcon />,
    state: 'dashboard',
  },
];

const serviceMenus = [
  {
    title: 'Documents',
    icon: <OtherHousesOutlinedIcon />,
    state: 'documents',
  },
  {
    title: 'Users',
    icon: <PeopleAltIcon />,
    state: 'users',
  },
  {
    title: 'Logout',
    icon: <LogoutIcon />,
    state: 'logout',
  },
];

const Sidebar = ({ sidebarWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    // Perform any necessary logout logic here, such as clearing tokens

    // Redirect to home page
    navigate('/');
  };

  const MenuItem = (props) => {
    const { item } = props;
    const isActive = pathname.includes(item.state);

    const handleClick = () => {
      if (item.state === 'logout') {
        handleLogout();
      } else {
        navigate(`/${item.state}`);
      }
    };

    return (
      <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
        <ListItemButton
          sx={{
            borderRadius: '10px',
            bgcolor: isActive ? colors.green[600] : '',
            color: isActive ? colors.common.white : '',
            '&:hover': {
              bgcolor: isActive ? colors.green[600] : '',
              color: isActive ? colors.common.white : '',
            },
          }}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={{
              minWidth: '40px',
              color: isActive ? colors.common.white : '',
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={<Typography fontWeight={600}>{item.title}</Typography>} />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box
      padding={3}
      paddingBottom={0}
      display='flex'
      flexDirection='column'
      height='100vh'
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {/* logo */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Animate type='fade' delay={1}>
          <img src={images.logo} alt='logo' height={60} />
        </Animate>
      </Box>
      {/* logo */}

      <Animate sx={{ flexGrow: 1 }}>
        <Paper
          elevation={0}
          square
          sx={{
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            p: 2,
            height: '100%',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          {/* menu group 1 */}
          <List>
            {menus.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </List>
          {/* menu group 1 */}

          {/* menu group 2 */}
          <List>
            <ListItem>
              <Typography fontWeight={600} mt={1} color={colors.grey[600]}>
                Services
              </Typography>
            </ListItem>
            {serviceMenus.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </List>
          {/* menu group 2 */}
        </Paper>
      </Animate>
    </Box>
  );

  return (
    <Box
      component='nav'
      sx={{
        width: { md: sidebarWidth },
        flexShrink: { md: 0 },
      }}
    >
      {/* large screen */}
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sidebarWidth,
            borderWidth: 0,
            bgcolor: 'transparent',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      {/* large screen */}
    </Box>
  );
};

export default Sidebar;



