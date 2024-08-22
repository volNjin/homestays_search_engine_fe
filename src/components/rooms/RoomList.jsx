import React from "react";
import "./RoomList.css";
import Room from "./Room";
export default function RoomList({rooms, urls }) {
  return (
    <div className="hotel-roomlist-container">
      {rooms.map((room) => (
        <Room data={room} urls={urls}/>
      ))}
    </div>
  );
}
