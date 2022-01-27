type FooterProps = {
    className?: string;
};

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={`py-4 shadow-top ${className}`}>
            <div className='c-container'>vincentole ©{new Date().getFullYear()}</div>
        </footer>
    );
};

export default Footer;
