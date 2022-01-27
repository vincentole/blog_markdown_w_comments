import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import Hero from '../components/home-page/Hero';
import { getFeaturedPosts } from '../lib/posts-util';

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ featuredPosts }) => {
    return (
        <>
            <Head>
                <title>vincentole's Blog</title>
                <meta name='description' content='I post about programming and web development.' />
            </Head>
            <Hero />
            <div className='spacer pt-12' />
            <FeaturedPosts posts={featuredPosts} />
            <div className='spacer pt-12' />
        </>
    );
};

export const getStaticProps = async () => {
    const featuredPosts = getFeaturedPosts();
    return { props: { featuredPosts } };
};

export default HomePage;
