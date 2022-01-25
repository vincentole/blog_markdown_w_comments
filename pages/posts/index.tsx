import type { NextPage } from 'next';
import AllPosts from '../../components/posts/AllPosts';
import PostType from '../../components/posts/PostType';

const DUMMY_POSTS: PostType[] = [
    {
        slug: 'getting-started',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
        content: '## This is my first post content.',
    },
    {
        slug: 'getting-started-with-nextjs',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
        content: '## This is my first post content.',
    },
    {
        slug: 'getting-started-with-react',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
        content: '## This is my first post content.',
    },
    {
        slug: 'getting-started-with-typescript',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
        content: '## This is my first post content.',
    },
];

const AllPostsPage: NextPage = () => {
    return (
        <div className='c-container'>
            <div className='spacer pt-12' />
            <AllPosts posts={DUMMY_POSTS} />
            <div className='spacer pt-12' />
        </div>
    );
};

export default AllPostsPage;
