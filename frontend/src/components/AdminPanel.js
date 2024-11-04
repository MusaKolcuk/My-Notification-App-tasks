import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, Button, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notifications');
                setNotifications(response.data.notifications);
            } catch (error) {
                console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
            }
        };

        fetchNotifications();
    }, []);

    const handleAdminLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });

            if (response.status === 200) {
                navigate('/admin');
                setOpen(false);
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Notifications</Typography>
            <List>
                {notifications.map((notification) => (
                    <ListItem key={notification.id}>
                        <Typography>{notification.message}</Typography>
                    </ListItem>
                ))}
            </List>
            <Button variant="outlined" onClick={() => setOpen(true)}>Admin Login</Button>
            <Button variant="outlined" style={{ marginLeft: '10px' }}>User Login</Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Container style={{ marginTop: '100px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                    <Typography variant="h5" gutterBottom>Admin Login</Typography>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleAdminLogin} style={{ marginTop: '20px' }}>
                        Login
                    </Button>
                </Container>
            </Modal>
        </Container>
    );
};

export default AdminPanel;
