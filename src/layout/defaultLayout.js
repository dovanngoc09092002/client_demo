import Footer from "../component/footer";
import Header from "../component/header";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="container content_page ">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
