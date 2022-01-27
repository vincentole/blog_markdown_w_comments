import CommentFetchedType from './CommentFetchedType';

type CommentItemProps = {
    comment: CommentFetchedType;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    return (
        <li className='bg-zinc-100 rounded py-4'>
            <div className='c-container'>
                <div className='text-zinc-700 text-sm'>{comment.name} wrote:</div>
                <p>{comment.comment}</p>
            </div>
        </li>
    );
};

export default CommentItem;
