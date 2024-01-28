import React from "react";
import "./RoomList.css";
import Room from "./Room";
export default function RoomList({ site, rooms }) {
  return (
    <div className="hotel-roomlist-container">
      {rooms.map((room) => (
        <Room site={site} data={room} />
      ))}
    </div>
  );
}
