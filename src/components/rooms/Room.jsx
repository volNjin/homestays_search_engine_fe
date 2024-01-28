import React from "react";
import "./Room.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function Room({ site, data }) {
  const format = (inputValue) => {
    const withoutDots = inputValue.replace(/\./g, "");
    const withoutCommas = withoutDots.replace(',', "");
    const reversedValue = withoutCommas.split("").reverse().join("");
    const formattedValue = reversedValue
      .replace(/(\d{3})/g, "$1.")
      .split("")
      .reverse()
      .join("");
    return formattedValue.startsWith(".")
      ? formattedValue.slice(1)
      : formattedValue;
  };
  return (
    <div className="hotel-room">
      <div className="hotel-room-name">{data.roomtype}</div>
      <table className="hotel-room-table">
        <thead>
          <tr>
            {data?.photos?.length > 0 && <th>Hình ảnh</th>}
            <th>Tiện nghi</th>
            <th>Sức chứa</th>
            <th>Giá phòng/đêm</th>
          </tr>
        </thead>
        <tbody>
          {data.availables.map((available, index) => (
            <tr key={index}>
              {/* Images column */}
              {data?.photos?.length > 0 && index === 0 && (
                <td width="40%" rowSpan={data.availables.length}>
                  <div className="roomImages">
                    {data.photos[0] && (
                      <div className="roomImgWrapper large">
                        <img src={data.photos[0]} alt="" className="roomImg" />
                      </div>
                    )}
                    {data.photos[1] && data.photos[2] && (
                      <div className="roomImgWrapper small">
                        <div className="roomImgWrapper">
                          <img
                            src={data.photos[1]}
                            alt=""
                            className="roomImg"
                          />
                        </div>
                        <div className="roomImgWrapper">
                          <img
                            src={data.photos[2]}
                            alt=""
                            className="roomImg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              )}

              {/* Facilities column */}
              {index === 0 && (
                <td width="30%" rowSpan={data.availables.length}>
                  <div className="roomDetail">
                    {data.roomsize && (
                      <div className="roomFacilityItem">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="hotelTopFeaturesItem icon"
                        />
                        <span>Diện tích phòng: {data.roomsize}m²</span>
                      </div>
                    )}
                    {data.facilities?.map((facility, i) => (
                      <div className="roomFacilityItem" key={i}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="hotelTopFeaturesItem icon"
                        />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </td>
              )}

              {/* Occupancy column */}
              <td width="10%">
                <div className="roomDetail">{available.occupancy} Người</div>
              </td>

              {/* Price column */}
              <td>
                <div className="roomPriceContainer">
                  <div className="roomPrice">{format(available.price)} đ</div>
                  {site === "agoda" &&<div className="roomPrice desc">Chưa bao gồm thuế và phí</div>}
                  {site ==="booking"&&<div className="roomPrice desc">Đã bao gồm thuế và phí</div>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
