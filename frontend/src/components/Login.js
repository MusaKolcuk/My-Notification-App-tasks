import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, setIsAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            setUser({
                id: response.data.user.id,
                token: response.data.token,
                email: response.data.user.email,
                isAdmin: response.data.user.isAdmin,
            });
            setErrorMessage('');

            if (response.data.user.isAdmin) {
                setIsAdmin(true);
                navigate('/admin');
            } else {
                setIsAdmin(false);
                navigate('/');
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.");
        }
    };

    const handleAdminLogin = () => {

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token) {
            const user = { id: userId, isAdmin: setUser.isAdmin };
            if (user.isAdmin) {
                navigate('/admin');
            } else {
                setErrorMessage("Bu sayfayı görüntülemek için yönetici olmalısınız.");
            }
        } else {
            setErrorMessage("Giriş bilgilerinizi doldurmalısınız! Eğer yönetici iseniz ilk önce 'Yönetici Girişi' butonuna daha sonra 'Giriş' butonuna basınız.");
        }
    };

    return (
        <div>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField
                label="Şifre"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                style={{ marginTop: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px' }}>
                Giriş
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleAdminLogin} style={{ marginTop: '10px', marginLeft: '10px' }}>
                Yönetici Girişi
            </Button>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </div>
    );
};

export default Login;
