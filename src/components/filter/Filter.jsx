import React, { useState } from "react";
import "./filter.css";
import { dump_bed, dump_review, dump_room_facilities, dump_view } from "../../utils/constant";
const Filter = ({ min, max, setMin, setMax, queryString, setQueryString }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const format = (inputValue) => {
    const withoutDots = inputValue.replace(/\./g, "");
    const reversedValue = withoutDots.split("").reverse().join("");
    const formattedValue = reversedValue
      .replace(/(\d{3})/g, "$1.")
      .split("")
      .reverse()
      .join("");
    return formattedValue.startsWith(".")
      ? formattedValue.slice(1)
      : formattedValue;
  };

  const handleMin = (e) => {
    setMin(format(e.target.value));
  };

  const handleMax = (e) => {
    setMax(format(e.target.value));
  };
  const handleInputFocus = (e) => {
    e.target.select();
  };

  const handleFilterReview = (e) => {
    const value = e.target.value;
    if (selectedOption === value) {
      setQueryString(queryString.replace(`&rating=${value}`, ""));
      setSelectedOption(null);
    } else {
      setQueryString(queryString.replace(`&rating=${selectedOption}`, ""));
      setQueryString((prev) => (prev += `&rating=${value}`));
      setSelectedOption(value);
    }
  };

  const handleFilterFacility = (e) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&facility=${e.target.value}`))
      : setQueryString(queryString.replace(`&facility=${e.target.value}`, ""));
  };
  return (
    <div className="filter">
      <div className="filterItem">
        <h3 className="filter h3">Giá mỗi đêm</h3>
        <div className="filterItem price box">
          <div className="filterItem price searchbox">
            <label>Tối thiểu</label>
            <input
              type="text"
              value={min}
              onChange={handleMin}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="filterItem price searchbox">
            <label>Tối đa</label>
            <input
              type="text"
              value={max}
              onChange={handleMax}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
      </div>
      <div className="filterItem">
        <h3 className="filter h3">Đánh giá của khách</h3>
        {dump_review.map((review, index) => (
          <label className="filterItem review">
            <input
              key={index}
              type="radio"
              value={review.rating}
              checked={selectedOption === review.rating}
              onClick={(e) => handleFilterReview(e)}
            />
            <span>{review.rating}+</span>
            <span>{review.review}</span>
          </label>
        ))}
      </div>
      <div className="filterItem">
        <h3 className="filter h3">Loại giường</h3>
        {dump_bed.map((bed, index) => (
          <label key={bed} className="filterItem checkbox">
            <input
              type="checkbox"
              value={bed}
              onChange={(e) => handleFilterFacility(e)}
            />
            <span>{bed}</span>
          </label>
        ))}
      </div>
      <div className="filterItem">
        <h3 className="filter h3">Hướng phòng</h3>
        {dump_view.map((view, index) => (
          <label key={view} className="filterItem checkbox">
            <input
              type="checkbox"
              value={view}
              onChange={(e) => handleFilterFacility(e)}
            />
            <span>{view}</span>
          </label>
        ))}
      </div>
      <div className="filterItem">
        <h3 className="filter h3">Tiện nghi phòng</h3>
        {dump_room_facilities.map((facility, index) => (
          <label key={facility} className="filterItem checkbox">
            <input
              type="checkbox"
              value={facility}
              onChange={(e) => handleFilterFacility(e)}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default Filter;
