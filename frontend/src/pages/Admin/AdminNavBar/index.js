import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Avatar, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function AdminNavBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); 
    }, []);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
      
        localStorage.removeItem("token");
        localStorage.removeItem("user");


        setIsLoggedIn(false);

        navigate("/admin/signin");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#073763" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Admin Profile" src="/path/to/profile-image.jpg" sx={{ width: 40, height: 40, marginRight: 2 }} />
                    <Typography variant="h6" sx={{ color: "white", fontSize: { xs: '1rem', sm: '1.5rem' } }}>
                        Admin Panel
                    </Typography>
                </Box>

                {/* Desktop Navigation */}
                {!isMobile ? (
                    <Box>
                        <Button color="inherit" component={Link} to="/userapplicationdetails">Applications</Button>
                        <Button color="inherit" component={Link} to="/news-update">News</Button>
                     

                        {/* Show Logout Button If Admin is Logged In */}
                        {isLoggedIn && (
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        )}
                    </Box>
                ) : (
                    // Mobile Menu
                    <>
                        <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/userapplicationdetails">Applications</MenuItem>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/news-update">News</MenuItem>
                        

                            {/* Show Logout Option in Menu for Mobile View */}
                            {isLoggedIn && (
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            )}
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default AdminNavBar;
