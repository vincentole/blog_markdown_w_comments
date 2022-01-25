import PostItem from './PostsItem';
import PostType from './PostType';

type PostGridProps = {
    posts: PostType[];
};

const PostsGrid: React.FC<PostGridProps> = ({ posts }) => {
    return (
        
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 content-center'>
            {posts.map((post) => (
                <PostItem key={post.slug} post={post} />
            ))}
        </ul>
    );
};

export default PostsGrid;
