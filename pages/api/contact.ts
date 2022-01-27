// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import MessageDBType from '../../components/contact/MessageDBType';
import MessageFormType from '../../components/contact/MessageFormType';

type Data = {
    message: string;
    newMessage?: MessageFormType;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        // Input validation
        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        // Store inputs in db
        const newMessage: MessageDBType = { email, name, message };
        let client: MongoClient;

        try {
            client = await MongoClient.connect(
                'mongodb+srv://vicentole:sVBgtT2a2AmwHE6@simpleblogwcomments.l8c0s.mongodb.net/myBlog?retryWrites=true&w=majority',
            );
        } catch (error) {
            res.status(500).json({ message: 'Could not connect to database.' });
            return;
        }

        const db = client.db();

        try {
            const result = await db.collection('message').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({ message: 'Storing message failed.' });
            return;
        }

        client.close();
        res.status(201).json({ message: 'Message sent successfully.', newMessage: newMessage });
    }
}
