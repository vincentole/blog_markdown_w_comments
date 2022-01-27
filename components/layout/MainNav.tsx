import Link from 'next/link';
import Logo from './Logo';

type MainNavProps = {
    className?: string;
}

const MainNav: React.FC<MainNavProps> = ({className}) => {
    return (
        <header className={`shadow ${className}`}>
            <div className='spacer pt-4' />
            <div className='c-container flex justify-between items-center'>
                <Link href='/'>
                    <a>
                        <Logo />
                    </a>
                </Link>

                <nav>
                    <ul className='flex gap-8'>
                        <li>
                            <Link href='/posts'>Posts</Link>
                        </li>
                        <li>
                            <Link href='/contact'>Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='spacer pt-4' />
        </header>
    );
};

export default MainNav;
