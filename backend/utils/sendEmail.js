import nodemailer from 'nodemailer';
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kaitlin.oreilly22@ethereal.email',
            pass: '5ruxVMtwhFQEwGjXkr'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;

