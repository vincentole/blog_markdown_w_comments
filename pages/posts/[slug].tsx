import type {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import PostContent from '../../components/posts/post-detail/PostContent';
import { getPostData, getPostsFiles } from '../../lib/posts-util';

const PostDetailsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    postData,
}) => {
    return (
        <>
            <Head>
                <title>{postData.title}</title>
                <meta name='description' content={postData.summary} />
            </Head>
            <div className='c-container'>
                <div className='spacer pt-12' />
                <PostContent post={postData} />
                <div className='spacer pt-12' />
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allFileNames = getPostsFiles();
    const slugs = allFileNames.map((file) => file.replace(/\.md$/, ''));
    const paths = slugs.map((slug) => ({ params: { slug: slug } }));
    return { paths: paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
    slug: string;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const { slug } = context.params as IParams;
    const postData = getPostData(slug);
    return { props: { postData }, revalidate: 600 };
};

export default PostDetailsPage;
