import React, { useEffect, useState } from "react";
import USER from "../../services/userService";
import FavhomeCard from "../../components/favhomeCard/FavhomeCard.jsx";
import Navbar from "../../components/navbar/Navbar";
import "./favhome.css";
export default function Favhome() {
  const [favhomes, setFavhomes] = useState([]);
  useEffect(() => {
    const fetchFavhomes = async () => {
      try {
        const res = await USER.getFavhomes();
        const data = res?.data;
        if (data) {
          setFavhomes(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFavhomes();
  }, [favhomes]);
  return (
    <div>
      <Navbar />
      <div className="favhomes-container">
        <div className="favhomes">
          {favhomes.length > 0 ? (
            <>
              <h1>Homestays bạn yêu thích</h1>
              {favhomes?.map((item, index) => (
                <div key={index} className="col-sm-4">
                  <FavhomeCard data={item} />
                </div>
              ))}
            </>
          ) : (
            <h1>Bạn chưa thích homestay nào!</h1>
          )}
        </div>
      </div>
    </div>
  );
}
