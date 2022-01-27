import PostType from '../PostType';
import PostHeader from './PostHeader';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Comments from './Comments';
import { CommentsFetchedType } from './CommentFetchedType';

type PostContentProps = {
    post: PostType;
    comments: CommentsFetchedType;
};

const PostContent: React.FC<PostContentProps> = ({ post, comments }) => {
    const imagePath = `/img/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        p(paragraph: any) {
            const { node } = paragraph;
            if (node.children[0].tagName === 'img') {
                const image = node.children[0];
                return (
                    <Image
                        src={`/img/posts/${post.slug}/${image.properties.src}`}
                        alt={image.properties.alt}
                        width={400}
                        height={300}
                        layout='responsive'
                        objectFit='contain'
                    />
                );
            }

            return <p>{paragraph.children}</p>;
        },

        code(code: any) {
            const { className, children } = code;
            const language = className ? className.split('-')[1] : 'sh';
            return (
                <SyntaxHighlighter style={vscDarkPlus} language={language}>
                    {children}
                </SyntaxHighlighter>
            );
        },
    };

    return (
        <article className='max-w-2xl border-l border-r border-zinc-200 px-4 mx-auto'>
            <div className='spacer pt-8' />
            <PostHeader title={post.title} image={imagePath} />
            <div className='spacer pt-20' />
            <div className='border-t border-zinc-200' />
            <div className='spacer pt-12' />
            <ReactMarkdown className='prose prose-zinc mx-auto' components={customRenderers}>
                {post.content}
            </ReactMarkdown>
            <div className='spacer pt-20' />
            <div className='border-t border-zinc-200' />
            <div className='spacer pt-12' />
            <section>
                <h2>Comments</h2>
                <div className='spacer pt-8' />
                <Comments slug={post.slug} comments={comments} />
            </section>
            <div className='spacer pt-8' />
        </article>
    );
};

export default PostContent;
