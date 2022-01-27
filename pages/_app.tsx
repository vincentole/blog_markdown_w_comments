import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>vincentole's Blog</title>
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
