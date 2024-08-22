import React from "react";
import "./Room.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function Room({ data, urls }) {
  console.log(data);
  const format = (inputValue) => {
    const withoutDots = inputValue.replace(/\./g, "");
    const withoutCommas = withoutDots.replace(",", "");
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
    <div className="homestay-room">
      <div className="homestay-room-name">{data.roomtype}</div>
      <table className="homestay-room-table">
        <thead>
          <tr>
            {data?.photos?.length > 0 && <th>Hình ảnh</th>}
            <th>Tiện nghi</th>
            <th>Sức chứa</th>
            <th>Giá phòng/đêm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Images column */}
            {data?.photos?.length > 0 && (
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
                        <img src={data.photos[1]} alt="" className="roomImg" />
                      </div>
                      <div className="roomImgWrapper">
                        <img src={data.photos[2]} alt="" className="roomImg" />
                      </div>
                    </div>
                  )}
                </div>
              </td>
            )}

            {/* Facilities column */}
            <td width="30%" rowSpan={data.availables.length}>
              <div className="roomDetail">
                {data.roomsize && (
                  <div className="roomFacilityItem">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="homestayTopFeaturesItem icon"
                    />
                    <span>Diện tích phòng: {data.roomsize}m²</span>
                  </div>
                )}
                {data.facilities?.map((facility, i) => (
                  <div className="roomFacilityItem" key={i}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="homestayTopFeaturesItem icon"
                    />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </td>

            {/* Occupancy column */}
            <td width="10%">
              <div className="roomDetail">
                {(() => {
                  const agodaOccupancy =
                    data.availables.agoda?.reduce(
                      (total, item) => total + item.occupancy,
                      0
                    ) || 0;
                  const bookingOccupancy =
                    data.availables.booking?.reduce(
                      (total, item) => total + item.occupancy,
                      0
                    ) || 0;
                  const travelokaOccupancy =
                    data.availables.traveloka?.reduce(
                      (total, item) => total + item.occupancy,
                      0
                    ) || 0;
                  const maxOccupancy = Math.max(
                    agodaOccupancy,
                    bookingOccupancy,
                    travelokaOccupancy
                  );

                  return `${maxOccupancy} Người`;
                })()}
              </div>
            </td>

            {/* Price column */}
            <td>
              <div className="roomPriceContainer">
                {data.availables.agoda && (
                  <>
                    <div className="roomPrice">
                      <strong>Agoda:</strong>{" "}
                      {format(data.availables.agoda[0].price)}₫
                    </div>
                    <div className="roomPrice desc">
                      Chưa bao gồm thuế và phí
                    </div>
                    <button
                      className="roomOrder"
                      onClick={() => window.open(urls.agoda, "_blank")}
                    >
                      Đặt ngay
                    </button>
                  </>
                )}
                {data.availables.booking && (
                  <>
                    <div className="roomPrice">
                      <strong>Booking:</strong>{" "}
                      {format(data.availables.booking[0].price)}₫
                    </div>
                    <div className="roomPrice desc">Đã bao gồm thuế và phí</div>
                    <button
                      className="roomOrder"
                      onClick={() => window.open(urls.booking, "_blank")}
                    >
                      Đặt ngay
                    </button>
                  </>
                )}
                {data.availables.traveloka && (
                  <>
                    <div className="roomPrice">
                      <strong>Traveloka:</strong>{" "}
                      {format(data.availables.traveloka[0].price)}₫
                    </div>
                    <div className="roomPrice desc">
                      Chưa bao gồm thuế và phí
                    </div>
                    <button
                      className="roomOrder"
                      onClick={() => window.open(urls.traveloka, "_blank")}
                    >
                      Đặt ngay
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
