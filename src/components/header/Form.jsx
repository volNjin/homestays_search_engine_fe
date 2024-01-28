import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Option from "./Option";

const Form = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location?.state?.destination != null ? location?.state?.destination : ""
  );

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const handleInputFocus = (e) => {
    e.target.select();
  };
  const handleSearch = () => {
    navigate("/homes", { state: { destination, options } });
  };
  return (
    <div className="headerSearch">
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <input
          type="text"
          placeholder="Nhập điểm du lịch"
          value={destination}
          className="headerSearchInput"
          onChange={(e) => setDestination(e.target.value)}
          onFocus={handleInputFocus}
        />
      </div>
      <Option options={options} setOptions={setOptions} />
      <div className="headerSearchBtn">
        <button
          className="headerBtn"
          onClick={handleSearch}
          disabled={!destination}
        >
          Tìm
        </button>
      </div>
    </div>
  );
};
export default Form;
