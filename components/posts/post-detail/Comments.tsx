import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { CommentsFetchedType } from './CommentFetchedType';
import CommentFormType from './CommentFormType';
import CommentItem from './CommentItem';

type RequestStatusType = null | 'pending' | 'success' | 'error';

const sendData = async (comment: CommentFormType, slug: string) => {
    const response = await fetch(`/api/comments/${slug}`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
    }
};

type CommentsProps = {
    slug: string;
    comments: CommentsFetchedType;
};

const Comments: React.FC<CommentsProps> = ({ slug, comments }) => {
    const [nameInput, setNameInput] = useState('');
    const [commentInput, setCommentInput] = useState('');
    const [requestStatus, setRequestStatus] = useState<RequestStatusType>(null);
    const [requestError, setRequestError] = useState<any>(null);

    let commentList: JSX.Element[] | string = '';
    if (comments === 'error') commentList = 'Fetching comments failed.';
    else if (comments && comments.length === 0) commentList = 'No comments yet.';
    else if (comments && comments.length > 0)
        commentList = comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
        ));

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timeout = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [requestStatus]);

    async function onSubmitHandler(e: FormEvent) {
        e.preventDefault();

        const newComment: CommentFormType = { name: nameInput, comment: commentInput };

        setRequestStatus('pending');

        // Client side validation
        // ...

        try {
            await sendData(newComment, slug);
            setRequestStatus('success');
            setNameInput('');
            setCommentInput('');
        } catch (e: any) {
            setRequestError(e.message);
            setRequestStatus('error');
        }
    }

    let notification: JSX.Element;

    if (requestStatus === 'pending') {
        notification = (
            <div className='text-blue-500' aria-live='polite'>
                Sending Message...
            </div>
        );
    } else if (requestStatus === 'error') {
        notification = (
            <div className='text-red-500' aria-live='polite'>
                {requestError}
            </div>
        );
    } else if (requestStatus === 'success') {
        notification = (
            <div className='text-green-500' aria-live='polite'>
                Message sent successfully.
            </div>
        );
    } else notification = <div></div>;

    return (
        <div>
            <form onSubmit={onSubmitHandler} className='space-y-4'>
                <div className='flex flex-col'>
                    <label htmlFor='name'>Your Name</label>
                    <input
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        type='text'
                        max={500}
                        id='name'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='comment'>Your Comment</label>
                    <textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        name='comment'
                        id='comment'
                        rows={3}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    {notification}
                    <button
                        type='submit'
                        className='w-36 border border-zinc-900 bg-zinc-900 text-white px-4 py-2'
                        disabled={requestStatus === 'pending' ? true : false}
                    >
                        {requestStatus === 'pending' ? 'Posting...' : 'Post Comment'}
                    </button>
                </div>
            </form>
            <div className='spacer pt-8' />
            <ul className='space-y-2'>{commentList}</ul>
        </div>
    );
};

export default Comments;
