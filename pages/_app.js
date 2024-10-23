// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';
import Head from 'next/head'
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
     <Head>
        <title>ARB Home Staging Group</title>
        <meta name="description" content="Professional home staging services to help sell your property faster" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Header /> 
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;