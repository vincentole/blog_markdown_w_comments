import PostsGrid from '../posts/PostsGrid';
import PostType from '../posts/PostType';

type FeaturedPostsProps = {
    posts: PostType[];
};

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
    return (
        <section>
            <div className='c-container'>
                <h2>Featured Posts</h2>
                <div className='spacer pt-8' />
                <PostsGrid posts={posts} />
            </div>
        </section>
    );
};

export default FeaturedPosts;
