import Image from 'next/image';

import profileImg from '../../public/img/site/ProfilePicture.jpeg';

const Hero = () => {
    return (
        <section className='text-center'>
            <div className='c-container'>
                <div className='spacer pt-5' />
                <div>
                    <Image
                        className='rounded-full'
                        src={profileImg}
                        width={240}
                        height={240}
                        objectFit='cover'
                        objectPosition='center'
                        alt='Profile Picture of Ole'
                    />
                </div>
                <div className="spacer pt-2" />
                <h2>Hi, Im Ole</h2>
                <p>I blog about web development - especially frameworks like React and Next.js.</p>
                <div className='spacer pt-5' />
            </div>
        </section>
    );
};

export default Hero;
