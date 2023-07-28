import React from 'react'
import './Room.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PersonIcon from './person.png'
export default function Room({ data }) {
    return (
        <div className='hotel-room'>
            <div className='hotel-room-name'>
                {data.room_name}
            </div>
            <table className='hotel-room-table'>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tiện nghi</th>
                    <th>Sức chứa</th>
                    <th>Giá phòng/đêm</th>
                </tr>
                <tr>
                    <td width={"40%"}>
                        {data.photos &&
                            <div className="roomImages">
                                <div className="roomImgWrapper large" key={0}>
                                    <img
                                        src={data.photos[0]}
                                        alt=""
                                        className="roomImg"
                                    />
                                </div>
                                <div className="roomImgWrapper small">
                                    {data.photos?.slice(1).map((photo, i) => (
                                        <div className="roomImgWrapper" key={i}>
                                            <img
                                                src={photo}
                                                alt=""
                                                className="roomImg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>}
                    </td>
                    <td width={"30%"}>
                        <div className='roomDetail'>
                            {data.highlights?.map((highlight, i) => (
                                <div className='roomHighlightItem' key={i}>
                                    <FontAwesomeIcon icon={faCheck} className="hotelTopFeaturesItem icon" />
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </td>
                    <td width={"15%"}>
                        <div className='roomDetail'>
                            {data.adult != 0 && <span>{data.adult} Người lớn</span>}
                            {data.child != 0 && <span>{data.child} Trẻ em</span>}
                        </div>
                    </td>
                    <td>
                        <div className='roomPriceContainer'>
                            <div className='roomPrice'>
                                {data.price}
                            </div>
                            <div className='roomPrice desc'>
                                Chưa bao gồm thuế và phí
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
