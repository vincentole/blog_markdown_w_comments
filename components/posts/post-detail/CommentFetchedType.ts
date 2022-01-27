export type CommentFetchedType = {
    _id: string;
    name: string;
    comment: string;
};

export type CommentsFetchedType = CommentFetchedType[] | 'error';

export default CommentFetchedType;
