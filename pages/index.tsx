import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import Hero from '../components/home-page/Hero';
import { getFeaturedPosts } from '../lib/posts-util';

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ featuredPosts }) => {
    return (
        <>
            <Hero />
            <div className='spacer pt-12' />
            <FeaturedPosts posts={featuredPosts} />
            <div className='spacer pt-12' />
        </>
    );
};

export const getStaticProps = async () => {
    const featuredPosts = getFeaturedPosts();
    console.log(featuredPosts);
    return { props: { featuredPosts } };
};

export default HomePage;
