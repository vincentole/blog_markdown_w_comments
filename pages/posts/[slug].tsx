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
import { MongoClient } from 'mongodb';
import CommentFetchedType, {
    CommentsFetchedType,
} from '../../components/posts/post-detail/CommentFetchedType';

const PostDetailsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    postData,
    comments,
}) => {
    return (
        <>
            <Head>
                <title>{postData.title}</title>
                <meta name='description' content={postData.summary} />
            </Head>
            <div className='c-container'>
                <div className='spacer pt-12' />
                <PostContent post={postData} comments={comments} />
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

    let client: MongoClient;
    let comments: CommentsFetchedType = [];

    try {
        client = await MongoClient.connect(String(process.env.DB_COMMENTS_API));

        const db = client.db();

        comments = (await db
            .collection(slug)
            .find()
            .sort({ _id: -1 })
            .limit(10)
            .map((d) => Object.assign(d, { _id: d._id.toString() }))
            .toArray()) as unknown as CommentFetchedType[];
    } catch (error) {
        comments = 'error';
        console.log('Fetching comments failed.');
    }

    return { props: { postData, comments }, revalidate: 600 };
};

export default PostDetailsPage;
