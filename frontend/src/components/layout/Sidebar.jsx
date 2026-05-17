import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";

import {
  Dashboard,
  Inventory2,
  People,
  ShoppingCart,
  AccountBalance,
  Construction,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const drawerWidth = 250;

const Sidebar = () => {
  const { user } = useAuth();

  // Menu Items
  const menuItems = [
    {
      name: "Dashboard",
      icon: <Dashboard />,
      path: "/",
      roles: [
        "admin",
        "manager",
        "site_engineer",
      ],
    },

    {
      name: "Materials",
      icon: <Inventory2 />,
      path: "/materials",
      roles: [
        "admin",
        "manager",
        "site_engineer",
      ],
    },

    {
      name: "Suppliers",
      icon: <People />,
      path: "/suppliers",
      roles: ["admin"],
    },

    {
      name: "Purchase",
      icon: <ShoppingCart />,
      path: "/purchase",
      roles: [
        "admin",
        "manager",
      ],
    },

    {
      name: "Inventory",
      icon: <Inventory2 />,
      path: "/inventory",
      roles: [
        "admin",
        "manager",
        "site_engineer",
      ],
    },

    {
      name: "Finance",
      icon: <AccountBalance />,
      path: "/finance",
      roles: [
        "admin",
        "manager",
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight:
            "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Logo */}
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Construction
            sx={{
              color: "#1565c0",
              fontSize: 35,
            }}
          />

          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Construction ERP
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Management System
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Divider />

      {/* Menu */}
      <List
        sx={{
          p: 2,
          flexGrow: 1,
        }}
      >
        {menuItems
          .filter((item) =>
            item.roles.includes(
              user?.role
            )
          )
          .map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{ mb: 1 }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 3,

                  "&:hover": {
                    backgroundColor:
                      "#e3f2fd",
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      {/* Profile Section */}
      <Box
        sx={{
          p: 2,
          borderTop:
            "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: "#fafafa",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#1565c0",
            width: 45,
            height: 45,
            fontWeight: "bold",
          }}
        >
          {user?.username
            ?.substring(0, 2)
            ?.toUpperCase() || "AD"}
        </Avatar>

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Logged in as
          </Typography>

          <Typography
            fontWeight="bold"
          >
            {user?.username || "Admin"}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;