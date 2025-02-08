import jwt from ('jsonwebtoken');

// const generateToken = (user) => {
//     const payload = {
//         id: user.id,
//         username: user.username,
//         email: user.email
//     };

//     const secret = process.env.JWT_SECRET; // Replace with your actual secret key
//     const options = {
//         expiresIn: '1h' // Token expiration time
//     };

//     return jwt.sign(payload, secret, options);
// };

// const sendToken = (user, res) => {
//     const token = generateToken(user);
//     res.json({ token });
// };

// export default {
//     generateToken,
//     sendToken
// };


//creting token and saving in cookie...
export const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookie 
    //store in cookie at the time of login
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
};

