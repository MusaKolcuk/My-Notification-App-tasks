import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import { Button, Container, Typography, AppBar, Toolbar } from '@mui/material';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Notification App
          </Typography>
          <Button color="inherit" component={Link} to="/">Ürünler</Button>
          <Button color="inherit" component={Link} to="/login">Giriş</Button>
          {user && (
            <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginLeft: '20px' }}>
              Çıkış Yap
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login setUser={setUser} setIsAdmin={setIsAdmin} />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel /> : <ProductList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
