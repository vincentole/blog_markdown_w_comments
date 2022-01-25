import MainNav from './MainNav';

const Layout: React.FC = (props) => {
    return (
        <>
            <MainNav />
            <main>{props.children}</main>
            <div className="spacer pt-12" />
        </>
    );
};

export default Layout;
