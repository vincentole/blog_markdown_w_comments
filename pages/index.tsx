import type { NextPage } from 'next';
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import Hero from '../components/home-page/Hero';
import PostType from '../components/posts/PostType';

const DUMMY_POSTS: PostType[] = [
    {
        slug: 'getting-started',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
    },
    {
        slug: 'getting-started-with-nextjs',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
    },
    {
        slug: 'getting-started-with-react',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
    },
    {
        slug: 'getting-started-with-typescript',
        title: 'Getting Started',
        image: 'getting-started.png',
        summary:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
        date: '2022-02-01',
    },
];

const HomePage: NextPage = () => {
    return (
        <>
            <Hero />
            <div className="spacer pt-12" />
            <FeaturedPosts posts={DUMMY_POSTS} />
        </>
    );
};

export default HomePage;
