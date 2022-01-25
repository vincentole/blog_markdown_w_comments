import type { NextPage } from 'next';
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import Hero from '../components/home-page/Hero';

const HomePage: NextPage = () => {
    return (
        <>
            <Hero />
            
            <FeaturedPosts />
        </>
    );
};

export default HomePage;
