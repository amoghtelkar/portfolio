import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async (req:NextApiRequest,res:NextApiResponse) => {

    const {name,email,message,ip,device} = req.body;

    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.TOKEN
        }
    });

    try{
        const response = await transporter.sendMail({
            from:email,
            to:'amoghtelkar96@gmail.com',
            subject:`Conatct form submission from ${name}`,
            html:`<p>You have a contact form submission<br>
            <strong>Name</strong>: ${name}<br>
            <strong>Email</strong>: ${email}\n<br>
            <strong>Message</strong>: ${message}</p><br>
            <strong>ip</strong>: ${ip}</p><br>
            <strong>device</strong>: ${device}</p>`

        })
    }catch(error)
    {
        res.status(400).json({error:error});
    }
    res.status(200).json(req.body);

}