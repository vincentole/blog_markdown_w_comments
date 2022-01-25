import PostType from '../PostType';
import PostHeader from './PostHeader';
import ReactMarkdown from 'react-markdown';
const DUMMY_POST: PostType = {
    slug: 'getting-started',
    title: 'Getting Started',
    image: 'getting-started.png',
    summary:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus doloribus optio vitae inventore exercitationem beatae hic, at perferendis culpa.',
    date: '2022-02-01',
    content: '## This is my first post content.',
};

const PostContent = () => {
    const imagePath = `/img/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

    return (
        <article className='max-w-2xl border-l border-r border-zinc-200 px-4 mx-auto'>
            <div className='spacer pt-8' />
            <PostHeader title={DUMMY_POST.title} image={imagePath} />
            <div className='spacer pt-8' />
            <div className='border-t border-zinc-200' />
            <div className='spacer pt-8' />
            <ReactMarkdown className='prose prose-zinc'>{DUMMY_POST.content}</ReactMarkdown>
            <div className='spacer pt-8' />
        </article>
    );
};

export default PostContent;
