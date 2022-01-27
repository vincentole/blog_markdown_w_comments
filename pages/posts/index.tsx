import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import AllPosts from '../../components/posts/AllPosts';
import { getAllPosts } from '../../lib/posts-util';

const AllPostsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ allPosts }) => {
    return (
        <>
            <Head>
                <title>All Posts</title>
                <meta name='description' content='A list of all programming related posts.' />
            </Head>
            <div className='c-container'>
                <div className='spacer pt-12' />
                <AllPosts posts={allPosts} />
                <div className='spacer pt-12' />
            </div>
        </>
    );
};

export const getStaticProps = async () => {
    const allPosts = getAllPosts();

    return { props: { allPosts } };
};

export default AllPostsPage;
