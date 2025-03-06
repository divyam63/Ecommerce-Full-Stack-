import nodemailer from 'nodemailer';
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: PROCESS.env.SMPT_MAIL,  //SMPT_SERVICE
            pass: PROCESS.env.SMPT_PASSWORD  //SMPT_PASSWORD
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

