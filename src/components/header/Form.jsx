import {
    faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import Option from "./Option";

const Form = () => {
    const [destination, setDestination] = useState("");

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, options } });
        navigate("/hotels", { state: { destination, options } });
    };
    return (
        <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                    type="text"
                    placeholder="Nhập điểm du lịch"
                    className="headerSearchInput"
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>               
                <Option options={options} setOptions={setOptions} />
            <div className="headerSearchBtn">
                <button className="headerBtn" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    )
}
export default Form;