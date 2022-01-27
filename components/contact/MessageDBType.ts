import { ObjectId } from "mongodb";

type MessageDBType = { id?: ObjectId | undefined; email: string; name: string; message: string };

export default MessageDBType;
