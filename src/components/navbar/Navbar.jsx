import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">JinHomes</span>
        </Link>   
        <h2>Tìm homestay phù hợp nhu cầu của bạn</h2>
      </div>
    </div>
  )
}

export default Navbar