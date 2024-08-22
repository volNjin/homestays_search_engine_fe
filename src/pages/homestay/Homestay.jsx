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
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import RoomList from "../../components/rooms/RoomList";
import Footer from "../../components/footer/Footer";
import Reviews from "../../components/reviews/Reviews";
import USER from "../../services/userService";
import { toast } from "react-toastify";
const Homestay = () => {
  const location = useLocation();
  localStorage.setItem("currentPath", location.pathname);
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/find/${id}`
  );
  const [siteReviews, setSiteReviews] = useState("");
  const [showLoginRequest, setShowLoginRequest] = useState(false);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    const initialSiteReviews = (() => {
      if (data?.reviews?.agoda.length > 0) {
        return "agoda";
      } else if (data?.reviews?.booking.length > 0) {
        return "booking";
      } else if (data?.reviews?.traveloka.length > 0) {
        return "traveloka";
      } else {
        return ""; // Default value if none of the conditions are met
      }
    })();
    setSiteReviews(initialSiteReviews);
  }, [data]);

  const handleChangeReviews = (event, site) => {
    if (site !== null) setSiteReviews(site);
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
  const addFavhome = async () => {
    try {
      await USER.addFavhome({
        user_id: userId,
        homename: data.homename,
        homephoto: data.images[0],
      });
      toast.success("Đã thêm home yêu thích");
    } catch (error) {
      if (error?.response?.data?.message === "No token provided!") {
        setShowLoginRequest(true);
      }
    }
  };
  const handleCancel = () => {
    setShowLoginRequest(false);
  };
  const handleConfirm = () => {
    navigate("/signin");
  };
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <Navbar />
      <Header />
      {loading ? (
        "loading"
      ) : (
        <div className="homestayContainer">
          {open && (
            <div className="slider">
              <div className="sliderWrapper">
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
                <div className="sliderImgWrapper">
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
            </div>
          )}
          <div className="homestayWrapper">
            {data.images && (
              <div className="homestayImages">
                <div className="homestayImgWrapper large" key={0}>
                  <img
                    onClick={() => handleOpen(0)}
                    src={data.images[0]}
                    alt=""
                    className="homestayImg"
                  />
                </div>
                <div className="homestayImgWrapperSmall">
                  {data.images?.slice(1, 7).map((photo, i) => (
                    <div className="homestayImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="homestayImg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="homestayInfo">
              <div className="homestayCommonInfo">
                <div className="homestayCommonInfoLeftChild">
                  <h1 className="homestayTitle">{data.homename}</h1>
                  <div className="homestayAddress">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{data.address}</span>
                  </div>
                </div>
                <div className="homestayCommonInfoRightChild">
                  <p>Nhấn</p>
                  <button
                    className="add-favhome-button"
                    onClick={() => addFavhome()}
                  >
                    <FontAwesomeIcon
                      icon={faHeartCirclePlus}
                      className="heart-plus"
                    />
                  </button>
                  <p>để thêm yêu thích</p>
                </div>
              </div>
              <div className="homestayDetails">
                <div className="homestayDetailsTexts">
                  <div className="homestayDetailsTexts item">
                    <p className="homestayDesc">{data.description}</p>
                  </div>
                  <div className="homestayDetailsTexts item">
                    <h3>Tiện nghi</h3>
                    <div className="homestayTopFeaturesGrid">
                      {data.property_highlights?.map((facility, i) => (
                        <div className="homestayTopFeaturesItem">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="homestayTopFeaturesItem icon"
                          />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data.rooms && (
              <div className="homestayDetailsTexts item">
                <h3>Thông tin phòng</h3>
                {data.rooms.length > 0 ? (
                  <RoomList rooms={data.rooms} urls={data.urls} />
                ) : (
                  <span>Không có phòng trên các nền tảng nguồn</span>
                )}
              </div>
            )}
            {data.reviews && (
              <div className="homestayDetailsTexts item">
                <h3>Đánh giá {data.homename}</h3>
                <div className="review-toggle">
                  <ToggleButtonGroup
                    color="primary"
                    value={siteReviews}
                    exclusive
                    onChange={handleChangeReviews}
                    aria-label="site"
                  >
                    {data?.reviews?.agoda.length > 0 && (
                      <ToggleButton value="agoda">Agoda</ToggleButton>
                    )}
                    {data?.reviews?.booking.length > 0 && (
                      <ToggleButton value="booking">Booking</ToggleButton>
                    )}
                    {data?.reviews?.traveloka.length > 0 && (
                      <ToggleButton value="traveloka">Traveloka</ToggleButton>
                    )}
                  </ToggleButtonGroup>
                  {data?.reviews[siteReviews]?.length > 0 ? (
                    <div className="siRating">
                      <button>{data.ratings[siteReviews]}</button>

                      <span>{data.reviews[siteReviews].length} đánh giá</span>
                    </div>
                  ) : (
                    <span>Không có đánh giá</span>
                  )}
                </div>
                {data?.reviews[siteReviews]?.length > 0 && (
                  <Reviews
                    site={siteReviews}
                    reviews={data.reviews[siteReviews]}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <Dialog
        open={showLoginRequest}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Yêu cầu đăng nhập"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn cần đăng nhập để sử dụng chức năng này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Homestay;
