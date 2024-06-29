import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const drawerWidth = 240;

const Admin_Sidebar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="h4" noWrap sx={{ fontWeight: 'bold' }}>
            Rentfurni
          </Typography>
        </Box>
        <List>
          <ListItem button component={Link} to="/admin">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="Admin_add_product">
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary="Add product" />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-shop">
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <ListItemText primary="Manage Shop" />
          </ListItem>
          <ListItem button component={Link} to="/admin/customer-list">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Customer List" />
          </ListItem>
          <ListItem button component={Link} to="Admin_AddCategory">
            <ListItemIcon><CategoryIcon /></ListItemIcon>
            <ListItemText primary="Add Category" />
          </ListItem>
          <ListItem button component={Link} to="/logout">
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin_Sidebar;
