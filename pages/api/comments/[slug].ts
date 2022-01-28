// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import CommentDBType from '../../../components/posts/post-detail/CommentDBType';

type Data = {
    message: string;
    newComment?: CommentDBType;
    comments?: CommentDBType[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const slug = req.query.slug as string;
    let client: MongoClient;

    try {
        client = await MongoClient.connect(String(process.env.DB_COMMENTS_API));
    } catch (error) {
        res.status(500).json({ message: 'Sending failed. Could not connect to database.' });
        return;
    }

    if (req.method === 'POST') {
        const { name, comment } = req.body;

        // Input validation
        if (!name || name.trim() === '' || !comment || comment.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        // Store inputs in db
        const newComment: CommentDBType = { name, comment };

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

    // if (req.method === 'GET') {
    //     const db = client.db();
    //     let documents: CommentDBType[] | null = null;

    //     try {
    //         documents = (await db
    //             .collection(slug)
    //             .find()
    //             .sort({ _id: -1 })
    //             .limit(10)
    //             .toArray()) as CommentDBType[];
    //     } catch (e: any) {
    //         client.close();
    //         res.status(500).json({ message: 'Fetching comments failed.' });
    //         return;
    //     }

    //     client.close();
    //     res.status(200).json({
    //         message: 'Successfully fetched comments.',
    //         comments: documents,
    //     });
    // }
}
