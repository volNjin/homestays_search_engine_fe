import "./homestay.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import RoomList from "../../components/rooms/RoomList";
import Footer from "../../components/footer/Footer";
import Reviews from "../../components/reviews/Reviews";
import { labelKeyword, sentimentKeyword } from "../../utils/constant";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; //fetching hotel id from path
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const [website, setWebsite] = useState("agoda");
  const [label, setLabel] = useState();
  const [sentiment, setSentiment] = useState();
  const combinedReviews = [];
  if (data?.reviews) {
    // Combine reviews from agoda
    combinedReviews.push(
      ...(data.reviews.agoda?.map((review) => ({
        ...review,
        website: "Agoda",
      })) || {})
    );

    // Combine reviews from booking
    combinedReviews.push(
      ...(data.reviews.booking?.map((review) => ({
        ...review,
        website: "Booking",
      })) || {})
    );

    // Combine reviews from traveloka
    combinedReviews.push(
      ...(data.reviews.traveloka?.map((review) => ({
        ...review,
        website: "Traveloka",
      })) || {})
    );
  }
  const filteredReviews = combinedReviews.filter((review) => {
    return (
      (!label || review.label?.toLowerCase().includes(label.toLowerCase())) &&
      (!sentiment || review.sentiment === sentiment)
    );
  });

  const handleChangeLabel = (event, label) => {
    setLabel(label);
  };
  const handleChangeSentiment = (event, sentiment) => {
    setSentiment(sentiment);
  };

  const handleChange = (event, site) => {
    setWebsite(site);
  };
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 6 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 6 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.images[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            {data.images && (
              <div className="hotelImages">
                <div className="hotelImgWrapper large" key={0}>
                  <img
                    onClick={() => handleOpen(0)}
                    src={data.images[0]}
                    alt=""
                    className="hotelImg"
                  />
                </div>
                <div className="hotelImgWrapperSmall">
                  {data.images?.slice(1).map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <h1 className="hotelTitle">{data.homename}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <div className="hotelDetailsTexts item">
                  <p className="hotelDesc">{data.description}</p>
                </div>
                <div className="hotelDetailsTexts item">
                  <h3>Tiện nghi</h3>
                  <div className="hotelTopFeaturesGrid">
                    {data.property_highlights?.map((facility, i) => (
                      <div className="hotelTopFeaturesItem">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="hotelTopFeaturesItem icon"
                        />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {data.rooms && (
                  <div className="hotelDetailsTexts item">
                    <h3>Thông tin phòng</h3>
                    <ToggleButtonGroup
                      color="primary"
                      value={website}
                      exclusive
                      onChange={handleChange}
                      aria-label="Website"
                    >
                      {data?.rooms?.agoda.length > 0 && (
                        <ToggleButton value="agoda">Agoda</ToggleButton>
                      )}
                      {data?.rooms?.booking.length > 0 && (
                        <ToggleButton value="booking">Booking</ToggleButton>
                      )}
                      {data?.rooms?.traveloka.length > 0 && (
                        <ToggleButton value="traveloka">Traveloka</ToggleButton>
                      )}
                    </ToggleButtonGroup>
                    <RoomList site={website} rooms={data.rooms[website]} />
                  </div>
                )}
                {data.reviews && (
                  <div className="hotelDetailsTexts item">
                    <h3>Bài đánh giá {data.homename}</h3>
                    <h4>Hạng mục:</h4>
                    <ToggleButtonGroup
                      color="success"
                      value={label}
                      exclusive
                      onChange={handleChangeLabel}
                      aria-label="Label"
                    >
                      {Object.entries(labelKeyword).map(([key, value]) => (
                        <ToggleButton value={key}>{value}</ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    <h4>Phản ứng của người đánh giá:</h4>
                    <ToggleButtonGroup
                      color="success"
                      value={sentiment}
                      exclusive
                      onChange={handleChangeSentiment}
                      aria-label="Sentiment"
                    >
                      {Object.entries(sentimentKeyword).map(([key, value]) => (
                        <ToggleButton value={key}>{value}</ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    {filteredReviews.length > 0 ? (
                      <Reviews reviews={filteredReviews} />
                    ) : (
                      <span>Không có đánh giá</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Hotel;
