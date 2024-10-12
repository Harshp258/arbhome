import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* You can add a footer here if needed */}
    </div>
  );
};

export default Layout;