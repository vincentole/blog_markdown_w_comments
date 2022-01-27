import { ObjectId } from 'mongodb';

type MessageDBType = { _id?: ObjectId | undefined; email: string; name: string; message: string };

export default MessageDBType;
