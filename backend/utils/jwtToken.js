import jwt from ('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    const secret = process.env.JWT_SECRET; // Replace with your actual secret key
    const options = {
        expiresIn: '1h' // Token expiration time
    };

    return jwt.sign(payload, secret, options);
};

const sendToken = (user, res) => {
    const token = generateToken(user);
    res.json({ token });
};

export default {
    generateToken,
    sendToken
};