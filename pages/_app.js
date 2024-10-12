// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header /> {/* This should only be here once */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;