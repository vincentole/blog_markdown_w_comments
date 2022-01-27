import { ObjectId } from 'mongodb';

type CommentDBType = {
    _id?: ObjectId | undefined;
    name: string;
    comment: string;
};

export default CommentDBType;
