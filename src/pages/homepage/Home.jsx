import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
