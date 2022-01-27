// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import CommentDBType from '../../../components/posts/post-detail/CommentDBType';

type Data = {
    message: string;
    newComment?: CommentDBType;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const slug = req.query.slug as string;

    if (req.method === 'POST') {
        const { name, comment } = req.body;

        // Input validation
        if (!name ||
            name.trim() === '' ||
            !comment ||
            comment.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        // Store inputs in db
        const newComment: CommentDBType = { name, comment };
        let client: MongoClient;

        try {
            client = await MongoClient.connect(
                'mongodb+srv://vincentole:sVBgtT2a2AmwHE6@simpleblogwcomments.l8c0s.mongodb.net/comments?retryWrites=true&w=majority',
            );
        } catch (error) {
            res.status(500).json({ message: 'Sending failed. Could not connect to database.' });
            return;
        }

        const db = client.db();

        try {
            const result = await db.collection(slug).insertOne(newComment);
            newComment._id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({ message: 'Sending failed. Could not store comment.' });
            return;
        }

        client.close();
        res.status(201).json({ message: 'Comment sent successfully.', newComment: newComment });
    }

    if (req.method === 'GET') {
        
    }
}
