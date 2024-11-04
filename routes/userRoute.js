import express from 'express';
import {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getAllUsers
} from '../controllers/userController.js';

const router = express.Router();

// Create new user
router.post('/', createUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.post('/logout', logoutUser);

// Update user
router.put('/update/:userId', updateUser);

// Delete user
router.delete('/delete/:userId', deleteUser);

// Get all users
router.get('/', getAllUsers);

export default router;
