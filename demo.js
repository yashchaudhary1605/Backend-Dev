import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cookieParser());
const SECRET = 'my-super-secret-key';
app.get('/set-cookie', (req, res) => {
    const user = {
        name: 'Lavanya',
        email: 'lavanya@gmail.com',
        role: 'admin'
    };

    const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true
    });

    res.send('JWT cookie set');
});

app.get('/get-cookie', (req, res) => {
    if (!req.cookies.token) {
        return res.send('No token found');
    }
    res.send(`Token: ${req.cookies.token}`);
});
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('You have been logged out');
});

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).send('Invalid token');
    }
};


app.get('/profile', authMiddleware, (req, res) => {
    res.send(`Welcome ${req.user.name}, role: ${req.user.role}`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});