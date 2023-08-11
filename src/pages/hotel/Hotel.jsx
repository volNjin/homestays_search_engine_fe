import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import RoomList from "../../components/rooms/RoomList";
import Footer from "../../components/footer/Footer";
import Comments from "../../components/comments/Comments";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];    //fetching hotel id from path
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  // Function to handle "View More" click
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
      {loading ? ("loading") : (<div className="hotelContainer">
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
              <img src={data.img_urls[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          {data.img_urls &&
            <div className="hotelImages">
              <div className="hotelImgWrapper large" key={0}>
                <img
                  onClick={() => handleOpen(0)}
                  src={data.img_urls[0]}
                  alt=""
                  className="hotelImg"
                />
              </div>
              <div className="hotelImgWrapperSmall">
                {data.img_urls?.slice(1).map((photo, i) => (
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
            </div>}
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <div className="hotelDetailsTexts item">
                <p className="hotelDesc">
                  {data.description}
                </p>
              </div>
              <div className="hotelDetailsTexts item">
                <h3>Điểm nổi bật nhất</h3>
                <div className="hotelTopFeatures">
                  {data.top_features?.map((feature, i) => (
                    <div className="hotelTopFeaturesItem">
                      <FontAwesomeIcon icon={faCheck} className="hotelTopFeaturesItem icon" />
                      <span>{feature.content}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hotelDetailsTexts item">
                <h3>Tiện nghi</h3>
                <div className="hotelTopFeaturesGrid">
                  {data?.facility_highlights?.map((facility, i) => (
                    <div className="hotelTopFeaturesItem">
                      <FontAwesomeIcon icon={faCheck} className="hotelTopFeaturesItem icon" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hotelDetailsTexts item">
                <h3>Thông tin phòng</h3>
                <RoomList hotelID={id} />
              </div>
              {data.comments &&
                <div className="hotelDetailsTexts item">
                  <h3>Bài đánh giá {data.name}</h3>
                  <Comments comments={data.comments} />
                </div>
              }
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
