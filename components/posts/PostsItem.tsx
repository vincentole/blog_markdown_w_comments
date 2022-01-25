import Image from 'next/image';
import Link from 'next/link';
import PostType from './PostType';

type PostItemProps = {
    post: PostType;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const imagePath = `/img/posts/${post.slug}/${post.image}`;
    const linkPath = `/posts/${post.slug}`;
    
    return (
        <li className='border border-zinc-200'>
            <Link href={linkPath}>
                <a>
                    <div>
                        <Image
                            src={imagePath}
                            alt={post.title}
                            width={300}
                            height={200}
                            layout='responsive'
                        />
                    </div>
                    <div className='spacer pt-4' />
                    <div className='px-3 pb-3'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>{post.title}</h3>
                            <time className='font-bold text-zinc-500 italic' >{formattedDate}</time>
                        </div>
                        <div className='spacer pt-2' />
                        <p>{post.summary}</p>
                    </div>
                </a>
            </Link>
        </li>
    );
};

export default PostItem;
