import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = React.memo(function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-[40vh] transition-all duration-300 bg-[var(--bg)] text-[var(--text)]">
      {/* <Header /> */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
});

export default Layout;
