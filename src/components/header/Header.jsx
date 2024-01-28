import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Form from "./Form";
const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <Form />
      </div>
    </div>
  );
};

export default Header;
