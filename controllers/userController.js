
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create new user
export const createUser = async (req, res) => {
    try {
        const { email, password, fullname, isAdmin } = req.body;

        const hashedPassword = await bcryptjs.hash(password, 10);

        const createdUser = await User.create({
            email,
            password: hashedPassword,
            fullname,
            isAdmin: isAdmin || false,
        });

        return res.status(201).json({ createdUser });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Geçersiz kimlik bilgileri" });
        }

        user.isLoggedIn = true;
        await user.save();

        // JWT oluştur
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '20h' });

        return res.status(200).json({
            message: "Giriş başarılı",
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
                isAdmin: user.isAdmin,
            },
            token
        });
    } catch (error) {
        console.error("Hata:", error.message);
        return res.status(500).json({ message: error.message });
    }
};


//Logout user
export const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isLoggedIn = false;
        await user.save();

        return res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};



// Update user
export const updateUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const { email, password, fullname } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);

        const [updatedRowsCount, updatedRows] = await User.update(
            { email, password: hashedPassword, fullname },
            { where: { id: userId }, returning: true }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ updatedUser: updatedRows[0] });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedRowsCount = await User.destroy({ where: { id: userId } });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};
