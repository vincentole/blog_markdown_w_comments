import type { NextPage } from 'next';
import PostContent from '../../components/posts/post-detail/PostContent';

const PostDetailsPage: NextPage = () => {
    return (
        <div className='c-container'>
            <div className='spacer pt-12' />
            <PostContent />
            <div className='spacer pt-12' />
        </div>
    );
};

export default PostDetailsPage;
