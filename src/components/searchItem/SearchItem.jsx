import { Link } from "react-router-dom";
import "./searchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.images[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.homename}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot} />{" "}
          <span>{item.address}</span>
        </div>
        <span className="siFeatures">
          {`${item.description.substring(0, 250)} ...`}
        </span>
      </div>
      <div className="siDetails">
        {item.ratings.agoda && (
          <div className="siRating">
            Agoda
            <button>{item.ratings.agoda}</button>
          </div>
        )}
        {item.ratings.booking && (
          <div className="siRating">
            Booking
            <button>{item.ratings.booking}</button>
          </div>
        )}
        {item.ratings.traveloka && (
          <div className="siRating">
            Traveloka
            <button>{item.ratings.traveloka}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPriceDetail">Giá mỗi đêm rẻ nhất từ</span>
          {item.cheapest_prices.agoda && (
            <div className="siPrices">
              Agoda
              <span className="siPrice">{item.cheapest_prices.agoda}₫</span>
            </div>
          )}
          {item.cheapest_prices.booking && (
            <div className="siPrices">
              Booking
              <span className="siPrice">{item.cheapest_prices.booking}₫</span>
            </div>
          )}
          {item.cheapest_prices.traveloka && (
            <div className="siPrices">
              Traveloka
              <span className="siPrice">{item.cheapest_prices.traveloka.split(" ")[0]}₫</span>
            </div>
          )}
        </div>
        <Link to={`/home/${item._id}`}>
          <button className="siCheckButton">Chi tiết</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
