import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

function UserStatus() {
    const [userData, setUserData] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);

    // Fetch the user data (visa applications) 
    useEffect(() => {
        axios.get('http://localhost:5001/api/visa/applications')
            .then(response => {
                console.log('Fetched User Data:', response.data);  
                if (Array.isArray(response.data)) {
                    setUserData(response.data);
                } else {
                    console.error('Received data is not an array');
                }
            })
            .catch(error => console.error('Error fetching user data:', error));

    }, []);




  
    const handleStatusChange = (id, newStatus) => {
    
        axios.put(`http://localhost:5001/api/visa/update-status/${id}`, { status: newStatus })
            .then(() => {
          
                setUserData((prevData) =>
                    prevData.map(user =>
                        user._id === id ? { ...user, status: newStatus } : user
                    )
                );
                setEditingUserId(null); 
            })
            .catch(error => console.error('Error updating status:', error));
    };

    return (
        <Grid container spacing={3}>
            {userData.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user._id}>
                    <Card sx={{ boxShadow: 3, p: 2 }}>
                        <CardContent>
                        
                            <Typography variant="h5" gutterBottom>
                                {user.userDetails ? `${user.userDetails.firstName} ${user.userDetails.lastName}` : 'Unknown User'}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Visa Type: {user.userDetails ? user.userDetails.visaType : 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Email: {user.userDetails ? user.userDetails.email : 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Mobile: {user.userDetails ? user.userDetails.mobileNumber : 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Passport: {user.userDetails ? user.userDetails.passportNumber : 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Nationality: {user.userDetails ? user.userDetails.nationality : 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Travel From: {user.userDetails ? `${user.userDetails.travelFrom} → ${user.userDetails.travelTo}` : 'N/A'}
                            </Typography>

                            <Box mt={2} mb={2}>
                                <Typography variant="h6" sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    color: user.status === 'Processed' ? 'green' :
                                        user.status === 'Sent' ? 'blue' : 'orange'
                                }}>
                                    Status: {user.status}
                                </Typography>
                            </Box>

                            {editingUserId === user._id ? (
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={user.status}
                                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                    >
                                        <MenuItem value="Processed">Processed</MenuItem>
                                        <MenuItem value="Sent">Sent</MenuItem>
                                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#073763',
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#062d54' }
                                        }}
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={() => setEditingUserId(user._id)} 
                                    >
                                        Edit Status
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default UserStatus;
