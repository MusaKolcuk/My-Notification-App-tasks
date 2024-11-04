import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Kimlik doğrulama gereklidir" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user || !user.isLoggedIn) {
            return res.status(401).json({ message: "Kimlik doğrulama geçersiz" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Kimlik doğrulama hatası:", error.message);
        return res.status(401).json({ message: "Kimlik doğrulama hatası" });
    }
};


export default authenticateUser;
