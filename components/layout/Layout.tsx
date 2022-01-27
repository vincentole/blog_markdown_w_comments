import Footer from './Footer';
import MainNav from './MainNav';

const Layout: React.FC = (props) => {
    return (
        
            <div className='flex flex-col min-h-screen'>
                <MainNav />
                <main>{props.children}</main>
                <Footer className='mt-auto' />
            </div>
        
    );
};

export default Layout;
