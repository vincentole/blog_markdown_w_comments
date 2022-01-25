import MainNav from './MainNav';

const Layout: React.FC = (props) => {
    return (
        <>
            <MainNav />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
