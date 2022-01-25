import PostsGrid from './PostsGrid';
import PostType from './PostType';

type AllPostsProps = {
    posts: PostType[];
};

const AllPosts: React.FC<AllPostsProps> = ({ posts }) => {
    return (
        <section>
            <h2>All Posts</h2>
            <div className='spacer pt-8' />
            <PostsGrid posts={posts} />
        </section>
    );
};

export default AllPosts;
