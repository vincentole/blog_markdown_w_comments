import Image from 'next/image';

type PostHeaderProps = {
    title: string;
    image: string;
};

const PostHeader: React.FC<PostHeaderProps> = ({ title, image }) => {
    return (
        <header className='flex gap-4 items-center h-52'>
            <h2 className='w-1/2'>{title}</h2>
            <div className='relative w-1/2 h-full'>
                <Image
                    src={image}
                    alt={title}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
            </div>
        </header>
    );
};

export default PostHeader;
