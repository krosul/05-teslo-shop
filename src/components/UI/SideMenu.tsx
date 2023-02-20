import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { UIContext } from 'context/UI';

export const SideMenu = () => {
  const { sideMenuOpen, toggleSideMenu } = useContext(UIContext);
  const router = useRouter();
  const onNavigate = (url: string) => {
    router.push(url);
    toggleSideMenu();
  };

  return (
    <Drawer
      open={sideMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItemButton>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mis Ordenes'} />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText
              primary={'Hombres'}
              onClick={() => onNavigate('/category/men')}
            />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText
              primary={'Mujeres'}
              onClick={() => onNavigate('/category/women')}
            />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText
              primary={'Niños'}
              onClick={() => onNavigate('/category/kid')}
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ingresar'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItemButton>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItemButton>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Productos'} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ordenes'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
