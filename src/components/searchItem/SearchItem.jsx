import { Link } from "react-router-dom";
import "./searchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        src={item.img_urls[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{item.address}</span>
        </div>
        <span className="siFeatures">
          {`${item.description.substring(0, 250)} ...`}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{item.review}</span>
          <button>{item.score}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPriceDetail">Giá mỗi đêm rẻ nhất từ</span>
          <span className="siPrice">{item.cheapest_price}₫</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">Chi tiết</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
